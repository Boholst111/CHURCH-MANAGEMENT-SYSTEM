<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Income Statement</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        h1 { color: #333; border-bottom: 2px solid #4CAF50; padding-bottom: 10px; }
        .header { margin-bottom: 30px; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
        th { background-color: #4CAF50; color: white; }
        .total-row { font-weight: bold; background-color: #f5f5f5; }
        .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Income Statement</h1>
        <p><strong>Period:</strong> {{ $start_date }} to {{ $end_date }}</p>
        <p><strong>Generated:</strong> {{ $generated_at }}</p>
    </div>

    <table>
        <thead>
            <tr>
                <th>Offering Type</th>
                <th style="text-align: right;">Amount</th>
            </tr>
        </thead>
        <tbody>
            @foreach($offerings as $offering)
            <tr>
                <td>{{ $offering->type }}</td>
                <td style="text-align: right;">₱{{ number_format($offering->total, 2) }}</td>
            </tr>
            @endforeach
            <tr class="total-row">
                <td>Total Income</td>
                <td style="text-align: right;">₱{{ number_format($total, 2) }}</td>
            </tr>
        </tbody>
    </table>

    <div class="footer">
        <p>This report was generated automatically by the Church Management System.</p>
    </div>
</body>
</html>
