<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Demographic Report</title>
    <style>
        body { font-family: Arial, sans-serif; font-size: 12px; }
        h1 { color: #2563eb; font-size: 24px; margin-bottom: 10px; }
        h2 { color: #374151; font-size: 18px; margin-top: 20px; margin-bottom: 10px; }
        .header { text-align: center; margin-bottom: 30px; }
        .info { margin-bottom: 20px; }
        .info-label { font-weight: bold; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        th, td { border: 1px solid #d1d5db; padding: 8px; text-align: left; }
        th { background-color: #f3f4f6; font-weight: bold; }
        .summary-box { background-color: #eff6ff; padding: 15px; margin-bottom: 20px; border-radius: 5px; }
        .footer { text-align: center; margin-top: 30px; font-size: 10px; color: #6b7280; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Demographic Report</h1>
        <p>Generated: {{ $generated_at }}</p>
    </div>

    <div class="summary-box">
        <h2>Overview</h2>
        <p><span class="info-label">Total Members:</span> {{ $report['total_members'] }}</p>
    </div>

    <h2>Members by Age Group</h2>
    <table>
        <thead>
            <tr>
                <th>Age Group</th>
                <th>Count</th>
                <th>Percentage</th>
            </tr>
        </thead>
        <tbody>
            @foreach($report['by_age'] as $ageGroup => $count)
            <tr>
                <td>{{ $ageGroup }}</td>
                <td>{{ $count }}</td>
                <td>{{ $report['total_members'] > 0 ? number_format(($count / $report['total_members']) * 100, 1) : 0 }}%</td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <h2>Members by Location</h2>
    <table>
        <thead>
            <tr>
                <th>City</th>
                <th>Count</th>
                <th>Percentage</th>
            </tr>
        </thead>
        <tbody>
            @foreach($report['by_location'] as $city => $count)
            <tr>
                <td>{{ $city ?: 'Unknown' }}</td>
                <td>{{ $count }}</td>
                <td>{{ $report['total_members'] > 0 ? number_format(($count / $report['total_members']) * 100, 1) : 0 }}%</td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <h2>Members by Gender</h2>
    <table>
        <thead>
            <tr>
                <th>Gender</th>
                <th>Count</th>
                <th>Percentage</th>
            </tr>
        </thead>
        <tbody>
            @foreach($report['by_gender'] as $gender => $count)
            <tr>
                <td>{{ ucfirst($gender) }}</td>
                <td>{{ $count }}</td>
                <td>{{ $report['total_members'] > 0 ? number_format(($count / $report['total_members']) * 100, 1) : 0 }}%</td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <h2>Members by Status</h2>
    <table>
        <thead>
            <tr>
                <th>Status</th>
                <th>Count</th>
                <th>Percentage</th>
            </tr>
        </thead>
        <tbody>
            @foreach($report['by_status'] as $status => $count)
            <tr>
                <td>{{ ucfirst($status) }}</td>
                <td>{{ $count }}</td>
                <td>{{ $report['total_members'] > 0 ? number_format(($count / $report['total_members']) * 100, 1) : 0 }}%</td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <h2>Members by Small Group</h2>
    <table>
        <thead>
            <tr>
                <th>Small Group</th>
                <th>Count</th>
                <th>Percentage</th>
            </tr>
        </thead>
        <tbody>
            @foreach($report['by_small_group'] as $group)
            <tr>
                <td>{{ $group['name'] }}</td>
                <td>{{ $group['count'] }}</td>
                <td>{{ $report['total_members'] > 0 ? number_format(($group['count'] / $report['total_members']) * 100, 1) : 0 }}%</td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <div class="footer">
        <p>Mahayahay Free Methodist Church - Demographic Report</p>
        <p>This report is confidential and intended for authorized personnel only.</p>
    </div>
</body>
</html>
