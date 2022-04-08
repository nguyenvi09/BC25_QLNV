function Validation(){
    this.kiemTraRong = function(value, spanID, mess){
        if(value === ""){
            //xuất thông báo lỗi
            getEle(spanID).innerHTML = mess;
            getEle(spanID).style.display = "block";
            return false;
        };
        return true;
        // else{
        //     getEle(spanID).innerHTML = "";
        //     getEle(spanID).style.display = "none";
        //     return true;
    };

    //hàm kiểm tra bắt buộc nhập số từ 4->6
    this.kiemTraSo = function(value, spanID, mess){
        var numbers = /^[0-9]+$/;
        //kiểm tra rỗng trước
        if(this.kiemTraRong(value, spanID, mess)){
            //hàm match sẽ return về 1 mảng
            if(value.match(numbers)){
                if(value.length >= 4 && value.length <= 6){
                    // dữ liệu hợp lệ 
                    getEle(spanID).style.display = "none";
                    getEle(spanID).innerHTML = "";
                    return true;
                }else{
                    getEle(spanID).style.display = "block";
                    getEle(spanID).innerHTML = mess;
                    return false;   
                };
            }else{
                getEle(spanID).style.display = "block";
                getEle(spanID).innerHTML = mess;
                return false;
            };
        }else{
            getEle(spanID).style.display = "block";
            getEle(spanID).innerHTML = mess;
            return false;
        };
    };
};