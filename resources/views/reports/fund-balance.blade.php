<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Fund Balance Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        h1 { color: #333; border-bottom: 2px solid #FF9800; padding-bottom: 10px; }
        .header { margin-bottom: 30px; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
        th { background-color: #FF9800; color: white; }
        .total-row { font-weight: bold; background-color: #f5f5f5; }
        .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Fund Balance Report</h1>
        <p><strong>Period:</strong> {{ $start_date }} to {{ $end_date }}</p>
        <p><strong>Generated:</strong> {{ $generated_at }}</p>
    </div>

    <table>
        <thead>
            <tr>
                <th>Fund Name</th>
                <th>Type</th>
                <th>Description</th>
                <th style="text-align: right;">Current Balance</th>
            </tr>
        </thead>
        <tbody>
            @foreach($funds as $fund)
            <tr>
                <td>{{ $fund->name }}</td>
                <td>{{ ucfirst($fund->fund_type) }}</td>
                <td>{{ $fund->description ?? 'N/A' }}</td>
                <td style="text-align: right;">₱{{ number_format($fund->current_balance, 2) }}</td>
            </tr>
            @endforeach
            <tr class="total-row">
                <td colspan="3">Total Fund Balance</td>
                <td style="text-align: right;">₱{{ number_format($total_balance, 2) }}</td>
            </tr>
        </tbody>
    </table>

    <div class="footer">
        <p>This report was generated automatically by the Church Management System.</p>
        <p>Includes all restricted and unrestricted funds.</p>
    </div>
</body>
</html>
