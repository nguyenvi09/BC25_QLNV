var currentFormat = new Intl.NumberFormat("vn-VN");
function getEle(id) {
  return document.getElementById(id);
}

var dsnv = new DanhSachNhanVien();
var validation = new Validation();
getLocalStorage();

// Ẩn nút cập nhật khi bấm Thêm nhân viên
getEle("btnThem").addEventListener("click", function(){
  getEle("btnThemNV").style.display = "block";
    getEle("btnCapNhat").style.display = "none";

});

//hàm lấy thông tin nhân viên
function layThongTinNhanVien() {
  var _taiKhoan = getEle("tknv").value;
  var _hoTen = getEle("name").value;
  var _email = getEle("email").value;
  var _matKhau = getEle("password").value;
  var _ngayLam = getEle("datepicker").value;
  var _luongCB = getEle("luongCB").value;
  var _chucVu = getEle("chucvu").value;
  var _gioLam = getEle("gioLam").value;

  var isValid = true;

  //kiểm tra tài khoản
  isValid &= validation.kiemTraRong(_taiKhoan,
    "tbTKNV",
    "(*) Vui lòng nhập số tài khoản") &&
    validation.kiemTraTaiKhoan(
      _taiKhoan,
      "tbTKNV",
      "(*) Vui lòng nhập từ 4 -> 6 số"
    ) 
    &&
    validation.kiemTraTrungTaiKhoan(
      _taiKhoan,
      "tbTKNV",
      "Số tài khoản đã tồn tại",
      dsnv.arr
    );

  //kiểm tra họ tên
  isValid &= validation.kiemTraTen(_hoTen, "tbTen", "(*) Vui lòng nhập họ tên");

  //kiểm tra email
  isValid &= validation.kiemTraRong(_email,
    "tbEmail",
    "(*) Vui lòng nhập mail") && validation.kiemTraEmail(
    _email,
    "tbEmail",
    "(*) Vui lòng nhập mail vd: abc@example.com"
  );

  //kiểm tra mật khẩu
  isValid &= validation.kiemTraRong(_matKhau,
    "tbMatKhau",
    "(*) Vui lòng nhập mật khẩu") && validation.kiemTraMK(
    _matKhau,
    "tbMatKhau",
    "(*) Mật khẩu từ 6 -> 10 ký tự (1 số, 1 đặc biệt, 1 hoa)"
  );

  //kiểm tra ngày làm
  isValid &= validation.kiemTraRong(
    _ngayLam,
    "tbNgay",
    "(*) Vui lòng chọn ngày vào làm"
  );

  //kiểm tra lương
  isValid &= validation.kiemTraRong(_luongCB,
    "tbLuongCB",
    "(*) Vui lòng nhập lương căn bản") && validation.kiemTraLuong(
    _luongCB,
    "tbLuongCB",
    "(*) Nhập lương từ 1,000,000 -> 20,000,000"
  );
  
  //kiểm tra chức vụ
  isValid &= validation.kiemTraChucVu(
    _chucVu,
    "tbChucVu",
    "(*) Vui lòng chọn chức vụ"
  );

  //kiểm tra giờ làm trong tháng
  isValid &= validation.kiemTraRong(_gioLam,
    "tbGiolam",
    "(*) Vui lòng nhập số giờ làm trong tháng") && validation.kiemTraGioLam(
    _gioLam,
    "tbGiolam",
    "(*) Nhập giờ làm từ 80 -> 200"
  );

  if (isValid) {
    var nhanVien = new NhanVien(
      _taiKhoan,
      _hoTen,
      _email,
      _matKhau,
      _ngayLam,
      _luongCB,
      _chucVu,
      _gioLam
    );

    nhanVien.tinhLuong();
    nhanVien.xepLoai();

    return nhanVien;
  };
  return null;
};

//thêm nhân viên
getEle("btnThemNV").addEventListener("click", function () {
  var nhanVien = layThongTinNhanVien();
  //nếu đối tượng nhanVien !== null thì ta xử lý tiếp
  if (nhanVien) {
    //push đối tượng vừa tạo vào mảng để quản lý
    dsnv.themNV(nhanVien);
    //gọi hàm để in bảng ra giao diện
    taoBang(dsnv.arr);
    //lưu dữ liệu LocalStorage
    setLocalStorage();
  }
});

//hàm tạo bảng
function taoBang(arr) {
  var content = "";
  for (i = 0; i < arr.length; i++) {
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
        </tr> `;
  }
  getEle("tableDanhSach").innerHTML = content;
}

// hàm lưu dữ liệu LocalStorage
function setLocalStorage() {
  //chuyển dsnv.arr từ JSON => String và lưu biến dataString
  var dataString = JSON.stringify(dsnv.arr);

  //Luu dssv.arr xuong localStorage
  localStorage.setItem("DSNV", dataString);
}

//hàm tải dữ liệu khi ta tải lại trang web
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
  }
}

/**
 * để xóa trước hết lấy vị trí
 * dùng splice(index, 1)
 */
function xoaNV(taiKhoan) {
  dsnv.xoaNV(taiKhoan);
  taoBang(dsnv.arr);
  setLocalStorage();
}

//sửa nhân viên
function suaNV(taiKhoan) {
  //ẩn nút thêm người dùng
  getEle("btnThemNV").style.display = "none";
  //hiện nút cập nhật
  getEle("btnCapNhat").style.display = "block";
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
}

//cập nhật nhân viên
getEle("btnCapNhat").addEventListener("click", function () {
  //lấy lại thông tin mới gán đối tượng vào biến
  var nhanVien = layThongTinNhanVien();
  //gán vào danh sách
  dsnv.capNhatNV(nhanVien);
  //render table
  taoBang(dsnv.arr);
  //lưu lại localStorage
  setLocalStorage();
});

//tìm nhân viên theo loại
getEle("searchName").addEventListener("keyup", function () {
  var keyWord = getEle("searchName").value;
  var mangTimKiem = dsnv.timTheoLoai(keyWord);
  taoBang(mangTimKiem);
});
