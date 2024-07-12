function create() {
    let title = $('#title').val();
    let startDate = $('#startDate').val();
    let endDate = $('#endDate').val();
    let discountMoney = $('#category').val();
    let description = $('#description').val();

    let newDiscount = {
        startDate: startDate, description: description, endDate: endDate, discountMoney: discountMoney, title: title
    }
    $.ajax({
        headers: {
            'Accept': 'application/json', 'Content-Type': 'application/json'
        }, url: 'http://localhost:8080/api/discounts', type: 'POST', data: JSON.stringify(newDiscount), success: () => {
            alert('Discount created successfully');
        }
    });
    event.preventDefault();
}

function displayCategory(id) {
    console.log(id);
    $.ajax({
        type: 'GET', url: 'http://localhost:8080/api/categories', success: function (data) {
            let content = `<option selected>The loai</option>
            `
            for (let i = 0; i < data.length; i++) {
                content += `<option value="${data[i].id}">${data[i].name}</option>`;
            }
            console.log(content);
            document.getElementById(`${id}`).innerHTML = content;
        }
    });
    event.preventDefault();
}