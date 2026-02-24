<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Financial Summary Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        h1 { color: #333; border-bottom: 2px solid #4CAF50; padding-bottom: 10px; }
        .header { margin-bottom: 30px; }
        .info { margin-bottom: 20px; }
        .summary { margin: 20px 0; }
        .summary-item { padding: 15px; margin: 10px 0; border-left: 4px solid #4CAF50; background: #f5f5f5; }
        .label { font-weight: bold; color: #666; }
        .value { font-size: 24px; font-weight: bold; color: #333; }
        .positive { color: #4CAF50; }
        .negative { color: #f44336; }
        .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Financial Summary Report</h1>
        <div class="info">
            <p><strong>Period:</strong> {{ $start_date }} to {{ $end_date }}</p>
            <p><strong>Generated:</strong> {{ $generated_at }}</p>
        </div>
    </div>

    <div class="summary">
        <div class="summary-item">
            <div class="label">Total Offerings</div>
            <div class="value positive">₱{{ number_format($offerings, 2) }}</div>
        </div>

        <div class="summary-item">
            <div class="label">Total Expenses</div>
            <div class="value negative">₱{{ number_format($expenses, 2) }}</div>
        </div>

        <div class="summary-item">
            <div class="label">Net Position</div>
            <div class="value {{ $net_position >= 0 ? 'positive' : 'negative' }}">
                ₱{{ number_format($net_position, 2) }}
            </div>
        </div>
    </div>

    <div class="footer">
        <p>This report was generated automatically by the Church Management System.</p>
        <p>All amounts are in Philippine Pesos (₱).</p>
    </div>
</body>
</html>
