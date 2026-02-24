<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Expense Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        h1 { color: #333; border-bottom: 2px solid #f44336; padding-bottom: 10px; }
        .header { margin-bottom: 30px; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 12px; }
        th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
        th { background-color: #f44336; color: white; }
        .total-row { font-weight: bold; background-color: #f5f5f5; }
        .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Expense Report</h1>
        <p><strong>Period:</strong> {{ $start_date }} to {{ $end_date }}</p>
        <p><strong>Generated:</strong> {{ $generated_at }}</p>
    </div>

    <table>
        <thead>
            <tr>
                <th>Date</th>
                <th>Category</th>
                <th>Vendor</th>
                <th>Description</th>
                <th style="text-align: right;">Amount</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
            @foreach($expenses as $expense)
            <tr>
                <td>{{ $expense->date }}</td>
                <td>{{ $expense->category }}</td>
                <td>{{ $expense->vendor ?? 'N/A' }}</td>
                <td>{{ $expense->description }}</td>
                <td style="text-align: right;">₱{{ number_format($expense->amount, 2) }}</td>
                <td>{{ ucfirst($expense->approval_status) }}</td>
            </tr>
            @endforeach
            <tr class="total-row">
                <td colspan="4">Total Approved Expenses</td>
                <td style="text-align: right;">₱{{ number_format($total, 2) }}</td>
                <td></td>
            </tr>
        </tbody>
    </table>

    <div class="footer">
        <p>This report was generated automatically by the Church Management System.</p>
        <p>Only approved expenses are included in the total.</p>
    </div>
</body>
</html>
