/*TODO: Hien thi danh sach trang chinh*/
let temporaryNumber = 0;

function displayList() {
    $.ajax({
        method: 'GET', url: 'http://localhost:8080/api/discounts', success: function (data) {
            let content = `  <tr>
                 <th>Số thứ tự</th>
                <th>Thời gian bắt đầu</th>
                <th>Thời gian kết thúc</th>
                <th>Mức giảm giá</th>
                <th>Chi tiết</th>
                <th> Mức giảm giá</th>
                <th>Hành động
                </th>
                
        </tr>`
            for (let i = 0; i < data.length; i++) {
                content += ` <tr>
            <td>${i + 1}</td>
            <td class="">${data[i].title}</td>
            <td class="">${data[i].startDate}</td>
            <td class="">${data[i].endDate}</td>
            <td class = "">${data[i].detail}</td>
            <td class="">${data[i].discountMoney}</td>
            <td>
                <Button type="button" class="btn btn-success"  data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="getTheOldDataOfdiscountFromServer(${data[i].id})"><i class="fa-solid fa-pen-to-square"></i></Button>
                <span><button type="button" class="btn btn-danger" onclick="deleteById(${data[i].id})"><i class="fa-solid fa-trash"></i></button></span>
            </td>
        </tr>`;
            }
            content += `</table>`;
            document.getElementById('discounts').innerHTML = content;
        }
    })
}

displayList();

/*TODO: xoa theo id*/
function deleteById(id) {
    if (confirm("Bạn có thực sự muốn xóa ? Hãy Xác nhận lại!")) {
        $.ajax({
            type: 'DELETE',
            url: `http://localhost:8080/api/discounts/${id}`,
            success: () => {
                alert("Đã xóa thành công!");
                displayList();
            },
        });
    }
}

/*TODO: lay du lieu muon chinh sua theo id*/
function getTheOldDataOfdiscountFromServer(id) {
    $.ajax({
        type: 'GET',
        url: `http://localhost:8080/api/discounts/${id}`,
        success: function (data) {
            document.getElementById('price-edit').value = data.price;
            document.getElementById('startDate-edit').value = data.startDate;
            document.getElementById('description-edit').value = data.description;
            document.getElementById('endDate-edit').value = data.endDate;
            document.getElementById('category-edit').value = data.category.name;
        },
    })
    temporaryNumber = id;
    event.preventDefault();
}

/*TODO: day du lieu len server tu the form de
*       thay doi du lieu cua san pham voi id
*       truyen len*/
function updatediscount() {
    let newdiscount = {
        price: document.getElementById('price-edit').value,
        startDate: document.getElementById('startDate-edit').value,
        description: document.getElementById('description-edit').value,
        endDate: document.getElementById('endDate-edit').value,
        discountMoney: {
            name: document.getElementById('category-edit').value
        }
    };
    $.ajax({
        headers: {
            'Accept': 'application/json', 'Content-Type': 'application/json'
        },
        type: 'PUT',
        url: `http://localhost:8080/api/discounts/${temporaryNumber}`,
        data: JSON.stringify(newdiscount),
        success: function () {
            alert('discount updated successfully');
            displayList();
        }
    });
    event.preventDefault();

}
