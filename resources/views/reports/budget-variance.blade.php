<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Budget Variance Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        h1 { color: #333; border-bottom: 2px solid #9C27B0; padding-bottom: 10px; }
        h2 { color: #666; margin-top: 30px; }
        .header { margin-bottom: 30px; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
        th { background-color: #9C27B0; color: white; }
        .positive { color: #4CAF50; }
        .negative { color: #f44336; }
        .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Budget Variance Report</h1>
        <p><strong>Period:</strong> {{ $start_date }} to {{ $end_date }}</p>
        <p><strong>Generated:</strong> {{ $generated_at }}</p>
    </div>

    @foreach($budgets as $budgetData)
    <h2>{{ $budgetData['budget']->name }} ({{ $budgetData['budget']->period_type }})</h2>
    <p><strong>Budget Period:</strong> {{ $budgetData['budget']->start_date }} to {{ $budgetData['budget']->end_date }}</p>
    <table>
        <thead>
            <tr>
                <th>Category</th>
                <th style="text-align: right;">Budgeted</th>
                <th style="text-align: right;">Actual</th>
                <th style="text-align: right;">Variance</th>
            </tr>
        </thead>
        <tbody>
            @foreach($budgetData['items'] as $item)
            @php
                $variance = $item->budgeted_amount - $item->actual_amount;
            @endphp
            <tr>
                <td>{{ $item->category }}</td>
                <td style="text-align: right;">₱{{ number_format($item->budgeted_amount, 2) }}</td>
                <td style="text-align: right;">₱{{ number_format($item->actual_amount, 2) }}</td>
                <td style="text-align: right;" class="{{ $variance >= 0 ? 'positive' : 'negative' }}">
                    ₱{{ number_format(abs($variance), 2) }}
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>
    @endforeach

    <div class="footer">
        <p>This report was generated automatically by the Church Management System.</p>
        <p>Positive variance indicates under-budget spending.</p>
    </div>
</body>
</html>
