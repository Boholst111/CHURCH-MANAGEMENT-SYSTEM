<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Financial Report</title>
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
        <h1>Financial Report</h1>
        <p>Generated: {{ $generated_at }}</p>
    </div>

    <div class="info">
        <p><span class="info-label">Report Period:</span> {{ $report['period']['start_date'] }} to {{ $report['period']['end_date'] }}</p>
    </div>

    <div class="summary-box">
        <h2>Financial Summary</h2>
        <p><span class="info-label">Total Giving:</span> ₱{{ number_format($report['summary']['total_giving'], 2) }}</p>
        <p><span class="info-label">Total Transactions:</span> {{ $report['summary']['total_transactions'] }}</p>
        <p><span class="info-label">Average Transaction:</span> ₱{{ number_format($report['summary']['average_transaction'], 2) }}</p>
        <p><span class="info-label">Unique Givers:</span> {{ $report['summary']['unique_givers'] }}</p>
        <p><span class="info-label">Average Per Member:</span> ₱{{ number_format($report['average_per_member'], 2) }}</p>
    </div>

    <h2>Giving by Payment Method</h2>
    <table>
        <thead>
            <tr>
                <th>Payment Method</th>
                <th>Count</th>
                <th>Total Amount</th>
            </tr>
        </thead>
        <tbody>
            @foreach($report['summary']['by_payment_method'] as $method => $data)
            <tr>
                <td>{{ ucfirst($method) }}</td>
                <td>{{ $data['count'] }}</td>
                <td>₱{{ number_format($data['total'], 2) }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <h2>Monthly Giving Totals</h2>
    <table>
        <thead>
            <tr>
                <th>Month</th>
                <th>Total Amount</th>
            </tr>
        </thead>
        <tbody>
            @foreach($report['monthly_totals'] as $month)
            <tr>
                <td>{{ $month->year }}-{{ str_pad($month->month, 2, '0', STR_PAD_LEFT) }}</td>
                <td>₱{{ number_format($month->total, 2) }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <h2>Giving Trends</h2>
    <div class="summary-box">
        <p><span class="info-label">Trend:</span> {{ ucfirst($report['trends']['trend']) }}</p>
        <p><span class="info-label">Percentage Change:</span> {{ $report['trends']['percentage_change'] }}%</p>
    </div>

    <div class="footer">
        <p>Mahayahay Free Methodist Church - Financial Report</p>
        <p>This report is confidential and intended for authorized personnel only.</p>
    </div>
</body>
</html>
