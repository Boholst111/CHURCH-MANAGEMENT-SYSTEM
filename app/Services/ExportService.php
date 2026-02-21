<?php

namespace App\Services;

use App\Models\Member;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;

class ExportService
{
    /**
     * Export members to CSV format.
     *
     * @param Collection $members
     * @param array $columns
     * @return StreamedResponse
     */
    public function exportMembersToCSV(Collection $members, array $columns = []): StreamedResponse
    {
        // Default columns if none specified
        if (empty($columns)) {
            $columns = [
                'id',
                'first_name',
                'last_name',
                'email',
                'phone',
                'address',
                'city',
                'status',
                'small_group_name',
                'date_joined',
                'birth_date',
                'gender',
            ];
        }

        $filename = $this->generateTimestampedFilename('members_export', 'csv');

        return Response::stream(function () use ($members, $columns) {
            $handle = fopen('php://output', 'w');

            // Write CSV header
            $headers = $this->formatColumnHeaders($columns);
            fputcsv($handle, $headers);

            // Write member data rows
            foreach ($members as $member) {
                $row = $this->formatMemberRow($member, $columns);
                fputcsv($handle, $row);
            }

            fclose($handle);
        }, 200, [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => "attachment; filename=\"{$filename}\"",
            'Cache-Control' => 'no-cache, no-store, must-revalidate',
            'Pragma' => 'no-cache',
            'Expires' => '0',
        ]);
    }

    /**
     * Generate a timestamped filename.
     *
     * @param string $baseName
     * @param string $extension
     * @return string
     */
    public function generateTimestampedFilename(string $baseName, string $extension): string
    {
        $timestamp = now()->format('Y-m-d_H-i-s');
        return "{$baseName}_{$timestamp}.{$extension}";
    }

    /**
     * Format column headers for CSV.
     *
     * @param array $columns
     * @return array
     */
    protected function formatColumnHeaders(array $columns): array
    {
        return array_map(function ($column) {
            // Convert snake_case to Title Case
            return ucwords(str_replace('_', ' ', $column));
        }, $columns);
    }

    /**
     * Format a member row for CSV export.
     *
     * @param Member $member
     * @param array $columns
     * @return array
     */
    protected function formatMemberRow(Member $member, array $columns): array
    {
        $row = [];

        foreach ($columns as $column) {
            switch ($column) {
                case 'small_group_name':
                    $row[] = $member->smallGroup ? $member->smallGroup->name : '';
                    break;
                case 'date_joined':
                case 'birth_date':
                    $row[] = $member->$column ? $member->$column->format('Y-m-d') : '';
                    break;
                default:
                    $row[] = $member->$column ?? '';
                    break;
            }
        }

        return $row;
    }

    /**
     * Export members with applied filters.
     *
     * @param Collection $members
     * @param array $filters
     * @param array $columns
     * @return StreamedResponse
     */
    public function exportFilteredMembers(Collection $members, array $filters = [], array $columns = []): StreamedResponse
    {
        // The filtering is already applied to the collection passed in
        // This method provides a clear interface for exporting filtered data
        return $this->exportMembersToCSV($members, $columns);
    }
}
