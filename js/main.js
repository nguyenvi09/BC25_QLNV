function getEle(id){
    return document.getElementById(id);
};
// tạo đối tượng nhanVien từ lớp đối tượng NhanVien
var nhanVien = new NhanVien();

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

    nhanVien.tinhLuong();

    return nhanVien;
}

//thêm nhân viên
getEle("btnThemNV").addEventListener("click", function(){

});