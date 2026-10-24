# Ghi chú bản sửa Smart Timetable V2.4

## Các sửa đổi
1. Đổi khóa lưu cục bộ từ `smart-timetable-weekly-v1` sang `smart-timetable-weekly-v2.4`. Trình duyệt sẽ khởi tạo lại dữ liệu mẫu tuần 7 thay vì đọc nhầm bản lưu cũ không tương thích. Dữ liệu cũ vẫn nằm trong localStorage dưới khóa cũ, không bị xóa.
2. Bổ sung kiểm tra phần tử `#schoolName` và `#weekNumber` trước khi gán `textContent`, tránh lỗi nếu trang HTML đang được triển khai không đồng bộ với JavaScript.
3. Tăng phiên bản cache Service Worker lên `smart-timetable-v24.0` để buộc làm mới cache ứng dụng.

## Lưu ý về Google Apps Script
Ảnh Console cho thấy endpoint Google Apps Script đang gặp CORS / `Failed to fetch`. Bản sửa frontend không thể tự khắc phục chính sách CORS của endpoint. Vì vậy ứng dụng sẽ tiếp tục dùng dữ liệu mẫu/bản lưu cục bộ nếu cloud không truy cập được.

Để đồng bộ dùng chung:
- Mở Google Apps Script, kiểm tra `SHEET_ID` và `ADMIN_TOKEN` trong `Code.gs`.
- Deploy > Manage deployments > Edit (hoặc New deployment) > Web app; Execute as: Me; quyền truy cập phù hợp.
- Sao chép URL Web App mới kết thúc bằng `/exec` vào `js/cloud-config.js`.
- Kiểm tra URL `/exec?week=7` trong tab mới; cần trả về JSON. Sau đó kiểm tra Console/Network từ GitHub Pages.
- Không để token quản trị thật trong mã JavaScript công khai; token phía trình duyệt có thể bị xem. Nếu token đã được chia sẻ công khai, hãy đổi token.
