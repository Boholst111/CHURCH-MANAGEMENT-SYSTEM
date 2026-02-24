<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Church Report</title>
    <style>
        body { font-family: Arial, sans-serif; font-size: 12px; }
        h1 { color: #2563eb; font-size: 24px; margin-bottom: 10px; }
        h2 { color: #374151; font-size: 18px; margin-top: 20px; margin-bottom: 10px; }
        h3 { color: #6b7280; font-size: 16px; margin-top: 15px; margin-bottom: 8px; }
        .header { text-align: center; margin-bottom: 30px; }
        .info { margin-bottom: 20px; }
        .info-label { font-weight: bold; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        th, td { border: 1px solid #d1d5db; padding: 8px; text-align: left; }
        th { background-color: #f3f4f6; font-weight: bold; }
        .summary-box { background-color: #eff6ff; padding: 15px; margin-bottom: 20px; border-radius: 5px; }
        .section { page-break-inside: avoid; margin-bottom: 30px; }
        .footer { text-align: center; margin-top: 30px; font-size: 10px; color: #6b7280; }
        .page-break { page-break-after: always; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Comprehensive Church Report</h1>
        <p>Generated: {{ $generated_at }}</p>
    </div>

    <!-- Financial Section -->
    <div class="section">
        <h2>Financial Report</h2>
        
        <div class="info">
            <p><span class="info-label">Report Period:</span> {{ $financial['period']['start_date'] }} to {{ $financial['period']['end_date'] }}</p>
        </div>

        <div class="summary-box">
            <h3>Financial Summary</h3>
            <p><span class="info-label">Total Giving:</span> ₱{{ number_format($financial['summary']['total_giving'], 2) }}</p>
            <p><span class="info-label">Total Transactions:</span> {{ $financial['summary']['total_transactions'] }}</p>
            <p><span class="info-label">Average Transaction:</span> ₱{{ number_format($financial['summary']['average_transaction'], 2) }}</p>
            <p><span class="info-label">Unique Givers:</span> {{ $financial['summary']['unique_givers'] }}</p>
            <p><span class="info-label">Average Per Member:</span> ₱{{ number_format($financial['average_per_member'], 2) }}</p>
        </div>

        <h3>Giving by Payment Method</h3>
        <table>
            <thead>
                <tr>
                    <th>Payment Method</th>
                    <th>Count</th>
                    <th>Total Amount</th>
                </tr>
            </thead>
            <tbody>
                @foreach($financial['summary']['by_payment_method'] as $method => $data)
                <tr>
                    <td>{{ ucfirst($method) }}</td>
                    <td>{{ $data['count'] }}</td>
                    <td>₱{{ number_format($data['total'], 2) }}</td>
                </tr>
                @endforeach
            </tbody>
        </table>

        <h3>Giving Trends</h3>
        <div class="summary-box">
            <p><span class="info-label">Trend:</span> {{ ucfirst($financial['trends']['trend']) }}</p>
            <p><span class="info-label">Percentage Change:</span> {{ $financial['trends']['percentage_change'] }}%</p>
        </div>
    </div>

    <div class="page-break"></div>

    <!-- Demographic Section -->
    <div class="section">
        <h2>Demographic Report</h2>

        <div class="summary-box">
            <h3>Overview</h3>
            <p><span class="info-label">Total Members:</span> {{ $demographic['total_members'] }}</p>
        </div>

        <h3>Members by Age Group</h3>
        <table>
            <thead>
                <tr>
                    <th>Age Group</th>
                    <th>Count</th>
                    <th>Percentage</th>
                </tr>
            </thead>
            <tbody>
                @foreach($demographic['by_age'] as $ageGroup => $count)
                <tr>
                    <td>{{ $ageGroup }}</td>
                    <td>{{ $count }}</td>
                    <td>{{ $demographic['total_members'] > 0 ? number_format(($count / $demographic['total_members']) * 100, 1) : 0 }}%</td>
                </tr>
                @endforeach
            </tbody>
        </table>

        <h3>Members by Status</h3>
        <table>
            <thead>
                <tr>
                    <th>Status</th>
                    <th>Count</th>
                    <th>Percentage</th>
                </tr>
            </thead>
            <tbody>
                @foreach($demographic['by_status'] as $status => $count)
                <tr>
                    <td>{{ ucfirst($status) }}</td>
                    <td>{{ $count }}</td>
                    <td>{{ $demographic['total_members'] > 0 ? number_format(($count / $demographic['total_members']) * 100, 1) : 0 }}%</td>
                </tr>
                @endforeach
            </tbody>
        </table>

        <h3>Members by Small Group</h3>
        <table>
            <thead>
                <tr>
                    <th>Small Group</th>
                    <th>Count</th>
                    <th>Percentage</th>
                </tr>
            </thead>
            <tbody>
                @foreach($demographic['by_small_group'] as $group)
                <tr>
                    <td>{{ $group['name'] }}</td>
                    <td>{{ $group['count'] }}</td>
                    <td>{{ $demographic['total_members'] > 0 ? number_format(($group['count'] / $demographic['total_members']) * 100, 1) : 0 }}%</td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </div>

    <div class="footer">
        <p>Mahayahay Free Methodist Church - Comprehensive Report</p>
        <p>This report is confidential and intended for authorized personnel only.</p>
    </div>
</body>
</html>
