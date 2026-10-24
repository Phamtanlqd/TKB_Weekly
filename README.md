# Smart Timetable V3 – THPT Chuyên Lê Quý Đôn
Bản V2 + lớp **lịch sử nhiều tuần** (menu *Lịch Sử & So Sánh*).

## Dùng hằng tuần
1. Đăng nhập quản trị (Cài Đặt) → **Nạp file TKB** (giáo viên, lớp, buổi chiều).
2. Hệ thống tự lưu tuần đó vào IndexedDB (năm học, học kỳ, tuần lấy từ tiêu đề file; HK1 = tuần 1–18, HK2 = từ tuần 19).
3. Muốn **mọi người** thấy tuần mới: thay 3 file trong `assets/data/` rồi push lên GitHub (như V2).

## Lịch sử, so sánh, báo cáo
- Xem lại tuần cũ, so sánh 2 tuần (tiết mới/xóa, đổi GV/phòng/lớp/môn), báo cáo học kỳ & năm học (biểu đồ + Excel).
- **Lịch sử lưu theo từng thiết bị/trình duyệt.** Mỗi thiết bị tự tích lũy các tuần đã công bố mà nó mở. Chuyển sang máy khác: *Sao lưu (JSON)* rồi *Khôi phục*.
- Lần đầu dùng V3, nạp lại từng file tuần cũ để có lịch sử.

## Triển khai
Push toàn bộ thư mục lên GitHub → Settings → Pages (branch `main`, `/root`).
Đổi mật khẩu quản trị trong `js/config.js` (xem hướng dẫn trong file).
