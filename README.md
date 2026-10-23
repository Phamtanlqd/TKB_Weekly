# Smart Timetable V2.1 — bản sửa TKB tuần 7

Khuyến nghị chạy GitHub Pages hoặc localhost. Chạy cục bộ: `python -m http.server 8000`, mở `http://localhost:8000`. Không mở trực tiếp bằng `file://` vì trình duyệt chặn ES Modules.

GitHub Pages: đưa toàn bộ NỘI DUNG thư mục này lên root nhánh `main`; bật Settings → Pages → Deploy from a branch → `main` → `/(root)`.

Bản sửa: dữ liệu tuần 7 thực từ file Excel đã cung cấp (814 bản ghi); thêm fallback dữ liệu nhúng nếu JSON lỗi; bảng TKB hiển thị 8 tiết; cập nhật phiên bản cache service worker.

Cập nhật: nhấn “Cập nhật TKB”, chọn Excel, chọn thay thế hoặc gộp dữ liệu.


## Smart Timetable V2.2 — Quản lý TKB theo tuần
- Chọn tuần 1–52 tại thanh công cụ phía trên.
- Mỗi tuần có bộ dữ liệu riêng; nhập Excel sẽ cập nhật tuần đang chọn, không ghi đè tuần khác.
- Dữ liệu được lưu trong localStorage của trình duyệt hiện tại và tồn tại sau khi tải lại trang trên cùng thiết bị/trình duyệt.
- Có nút sao chép tuần trước sang tuần đang chọn và xóa dữ liệu riêng của tuần.
- Vì đây là Frontend Only/GitHub Pages, dữ liệu chưa tự đồng bộ giữa thiết bị hoặc người dùng khác. Muốn đồng bộ toàn trường cần backend/Google Sheets.
- Khi nâng cấp, thay thế các tệp trong repository bằng nội dung thư mục `smart-timetable-v2-fixed`, giữ nguyên cấu trúc thư mục ở root.
