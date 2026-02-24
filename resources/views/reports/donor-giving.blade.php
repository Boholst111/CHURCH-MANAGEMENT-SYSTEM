<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Donor Giving Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        h1 { color: #333; border-bottom: 2px solid #3F51B5; padding-bottom: 10px; }
        .header { margin-bottom: 30px; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 12px; }
        th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
        th { background-color: #3F51B5; color: white; }
        .total-row { font-weight: bold; background-color: #f5f5f5; }
        .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Donor Giving Report</h1>
        <p><strong>Period:</strong> {{ $start_date }} to {{ $end_date }}</p>
        <p><strong>Generated:</strong> {{ $generated_at }}</p>
    </div>

    <table>
        <thead>
            <tr>
                <th>Date</th>
                <th>Donor</th>
                <th>Type</th>
                <th style="text-align: right;">Amount</th>
            </tr>
        </thead>
        <tbody>
            @foreach($donations as $donation)
            <tr>
                <td>{{ $donation->date }}</td>
                <td>{{ $donation->is_anonymous ? 'Anonymous' : $donation->donor_name }}</td>
                <td>{{ $donation->type }}</td>
                <td style="text-align: right;">₱{{ number_format($donation->amount, 2) }}</td>
            </tr>
            @endforeach
            <tr class="total-row">
                <td colspan="3">Total Donations</td>
                <td style="text-align: right;">₱{{ number_format($total, 2) }}</td>
            </tr>
        </tbody>
    </table>

    <div class="footer">
        <p>This report was generated automatically by the Church Management System.</p>
        <p>This report is suitable for tax documentation purposes.</p>
    </div>
</body>
</html>
