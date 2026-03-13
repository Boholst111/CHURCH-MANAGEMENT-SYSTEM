<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class ExportBetaFeedback extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'beta:export-feedback 
                            {--format=json : Export format (json or csv)}
                            {--output= : Output file path}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Export beta feedback data for analysis';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $format = $this->option('format');
        $outputPath = $this->option('output');

        $this->info('📊 Exporting beta feedback data...');

        // Fetch feedback data
        $feedback = DB::table('beta_feedback')
            ->join('users', 'beta_feedback.user_id', '=', 'users.id')
            ->select(
                'beta_feedback.*',
                'users.name as user_name',
                'users.email as user_email'
            )
            ->orderBy('beta_feedback.created_at', 'desc')
            ->get();

        if ($feedback->isEmpty()) {
            $this->warn('⚠️  No feedback data found.');
            return Command::SUCCESS;
        }

        $this->info("✅ Found {$feedback->count()} feedback items");

        // Export based on format
        if ($format === 'csv') {
            $content = $this->exportToCsv($feedback);
            $extension = 'csv';
        } else {
            $content = $this->exportToJson($feedback);
            $extension = 'json';
        }

        // Determine output path
        if (!$outputPath) {
            $timestamp = now()->format('Y-m-d');
            $outputPath = "beta-feedback-export-{$timestamp}.{$extension}";
        }

        // Save to storage
        Storage::put($outputPath, $content);

        // Also save to a fixed location for the analysis script
        Storage::put('beta-feedback-data.json', $this->exportToJson($feedback));

        $this->info("✅ Data exported successfully!");
        $this->info("📄 Output: storage/app/{$outputPath}");

        // Display summary
        $this->displaySummary($feedback);

        return Command::SUCCESS;
    }

    /**
     * Export feedback to JSON format
     */
    private function exportToJson($feedback): string
    {
        return json_encode($feedback->toArray(), JSON_PRETTY_PRINT);
    }

    /**
     * Export feedback to CSV format
     */
    private function exportToCsv($feedback): string
    {
        $csv = [];
        
        // Header row
        $csv[] = [
            'ID',
            'User Name',
            'User Email',
            'Type',
            'Severity',
            'Page',
            'Description',
            'Steps to Reproduce',
            'Expected Behavior',
            'Actual Behavior',
            'Status',
            'Admin Notes',
            'Created At',
            'Updated At',
        ];

        // Data rows
        foreach ($feedback as $item) {
            $csv[] = [
                $item->id,
                $item->user_name,
                $item->user_email,
                $item->type,
                $item->severity,
                $item->page,
                $item->description,
                $item->steps_to_reproduce ?? '',
                $item->expected_behavior ?? '',
                $item->actual_behavior ?? '',
                $item->status,
                $item->admin_notes ?? '',
                $item->created_at,
                $item->updated_at,
            ];
        }

        // Convert to CSV string
        $output = fopen('php://temp', 'r+');
        foreach ($csv as $row) {
            fputcsv($output, $row);
        }
        rewind($output);
        $content = stream_get_contents($output);
        fclose($output);

        return $content;
    }

    /**
     * Display summary statistics
     */
    private function displaySummary($feedback)
    {
        $this->newLine();
        $this->info('📈 Summary Statistics:');

        // Count by type
        $byType = $feedback->groupBy('type')->map->count();
        $this->line('   By Type:');
        foreach ($byType as $type => $count) {
            $this->line("      {$type}: {$count}");
        }

        // Count by severity
        $bySeverity = $feedback->groupBy('severity')->map->count();
        $this->line('   By Severity:');
        foreach ($bySeverity as $severity => $count) {
            $emoji = match($severity) {
                'critical' => '🔴',
                'high' => '🟠',
                'medium' => '🟡',
                'low' => '🟢',
                default => '⚪',
            };
            $this->line("      {$emoji} {$severity}: {$count}");
        }

        // Count by status
        $byStatus = $feedback->groupBy('status')->map->count();
        $this->line('   By Status:');
        foreach ($byStatus as $status => $count) {
            $this->line("      {$status}: {$count}");
        }

        // Critical issues
        $critical = $feedback->where('severity', 'critical')
            ->where('status', '!=', 'resolved')
            ->count();
        
        if ($critical > 0) {
            $this->newLine();
            $this->error("⚠️  {$critical} unresolved critical issue(s) require immediate attention!");
        }

        // High priority issues
        $high = $feedback->where('severity', 'high')
            ->where('status', '!=', 'resolved')
            ->count();
        
        if ($high > 0) {
            $this->warn("⚠️  {$high} unresolved high-priority issue(s)");
        }

        // Resolution rate
        $resolved = $feedback->where('status', 'resolved')->count();
        $total = $feedback->count();
        $rate = $total > 0 ? round(($resolved / $total) * 100, 1) : 0;
        
        $this->newLine();
        $this->info("✅ Resolution Rate: {$rate}% ({$resolved}/{$total})");
    }
}
