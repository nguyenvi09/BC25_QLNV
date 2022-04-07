var currentFormat = new Intl.NumberFormat("vn-VN");
/**
 * xóa 
 * cập nhật
 * tìm nhân viên theo loại và hiển thị
 */
function getEle(id){
    return document.getElementById(id);
};

var dsnv = new DanhSachNhanVien();
getLocalStorage();

//hàm lấy thông tin nhân viên
function layThongTinNhanVien(){
    var _taiKhoan = getEle("tknv").value;
    var _hoTen = getEle("name").value;
    var _email = getEle("email").value;
    var _matKhau = getEle("password").value;
    var _ngayLam = getEle("datepicker").value;
    var _luongCB = getEle("luongCB").value;
    var _chucVu = getEle("chucvu").value;
    var _gioLam = getEle("gioLam").value;

    var nhanVien = new NhanVien(_taiKhoan, _hoTen, _email, _matKhau,
        _ngayLam, _luongCB, _chucVu, _gioLam);

    nhanVien.tinhLuong();
    nhanVien.xepLoai();

    return nhanVien;
};

//thêm nhân viên
getEle("btnThemNV").addEventListener("click", function(){
    var nhanVien = layThongTinNhanVien();
    //push đối tượng vừa tạo vào mảng để quản lý
    dsnv.themNV(nhanVien);
    //gọi hàm để in bảng ra giao diện
    taoBang(dsnv.arr);
    //lưu dữ liệu LocalStorage
    setLocalStorage();
});

//hàm tạo bảng
function taoBang(arr){
    var content = "";
    for(i = 0; i < arr.length; i++){
        var nv = arr[i];
        content += `
        <tr>
            <td>${nv.taiKhoan}</td>
            <td>${nv.hoTen}</td>
            <td>${nv.email}</td>
            <td>${nv.ngayLam}</td>
            <td>${nv.chucVu}</td>
            <td>${nv.tongLuong}</td>
            <td>${nv.xepLoai}</td>
            <td data-toggle="modal" data-target="#myModal" class="btn btn-info" onclick="suaNV('${nv.taiKhoan}')">Sửa</td>
            <td class="btn btn-danger" onclick="xoaNV('${nv.taiKhoan}')">Xóa</td>
        </tr> `
    };
    getEle("tableDanhSach").innerHTML = content;
};

// hàm lưu dữ liệu LocalStorage
function setLocalStorage() {
    //chuyển dsnv.arr từ JSON => String và lưu biến dataString
    var dataString = JSON.stringify(dsnv.arr);
  
    //Luu dssv.arr xuong localStorage
    localStorage.setItem("DSNV", dataString);
  };

//hàm tải dữ liệu khi ta load lại trang web
function getLocalStorage() {
    //lấy key trong localStorage
    var dataString = localStorage.getItem("DSNV");
    //kiểm tra key có đúng không 
    if (dataString) {
      //Chuyển từ String => JSON
      var dataJson = JSON.parse(dataString);
      //Nạp data vào dsnv.arr
      dsnv.arr = dataJson;
      //render tbody
      taoBang(dsnv.arr);
    };
};

/**
 * để xóa trước hết lấy vị trí 
 * dùng splice(index, 1)
 */
function xoaNV(taiKhoan){
    dsnv.xoaNV(taiKhoan);
    taoBang(dsnv.arr);
    setLocalStorage();
};


/**
 * sửa - cập nhật
 * thêm 2 attribute data-toggle="modal" & data-target="#myModal" 
 * khi bấm sửa -> popup sẽ hiện lên
 * -> ẩn nút thêm người dùng
 * -> dom tới input nhập lại giá trị
 * -> xử lý nút cập nhật
 * -> render lại bảng
 * -> thiết lặp lại localStorage
 */

function suaNV(taiKhoan){
    //ẩn nút thêm người dùng
    getEle("btnThemNV").style.display = "none";
    //lấy thông tin nhân viên theo index
    var nhanVien = dsnv.layThongTinNV(taiKhoan);
    //có được đối tượng tại vị trí rồi thì ta dom lại các thẻ input tương ứng
    // để truyền giá trị hiện tại vào
    getEle("tknv").value = nhanVien.taiKhoan;
    //khóa ô tài khoản lại vì là duy nhất không được thay đổi
    getEle("tknv").disabled = true;
    getEle("name").value = nhanVien.hoTen;
    getEle("email").value = nhanVien.email;
    getEle("password").value = nhanVien.matKhau;
    getEle("datepicker").value = nhanVien.ngayLam;
    getEle("luongCB").value = nhanVien.luongCB;
    getEle("chucvu").value = nhanVien.chucVu;
    getEle("gioLam").value = nhanVien.gioLam;
    
};

getEle("btnCapNhat").addEventListener("click", function(){
    //lấy lại thông tin mới gán đối tượng vào biến
    var nhanVien = layThongTinNhanVien();
    //gán vào danh sách
    dsnv.capNhatNV(nhanVien);
    //render table
    taoBang(dsnv.arr);
    //lưu lại localStorage
    setLocalStorage();
});