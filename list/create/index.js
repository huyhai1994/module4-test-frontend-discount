function create() {
    let title = $('#title').val();
    let startDate = $('#startDate').val();
    let endDate = $('#endDate').val();
    let discountMoney = $('#discountMoney').val();
    let detail = $('#detail').val();

    let newDiscount = {
        startDate: startDate, title: title, endDate: endDate, discountMoney: discountMoney, detail: detail
    }
    console.log(newDiscount);
    $.ajax({
        headers: {
            'Accept': 'application/json', 'Content-Type': 'application/json'
        }, url: 'http://localhost:8080/api/discounts', type: 'POST', data: JSON.stringify(newDiscount), success: () => {
            alert('Discount created successfully');
        }
    });
    event.preventDefault();
}

