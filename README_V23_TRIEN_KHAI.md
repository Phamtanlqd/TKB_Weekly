# Smart Timetable V2.3 — nhập 3 tệp, chuẩn hóa và đồng bộ toàn trường

## 1. Tệp Excel đầu vào
Mỗi lần xuất bản một tuần, chọn đồng thời 3 tệp của cùng tuần:
1. TKB giáo viên buổi sáng (bảng có hàng tiêu đề `Giáo viên`, cột ngày/tiết).
2. TKB lớp buổi sáng (bảng có hàng tiêu đề `Lớp`, tên lớp theo cột, thứ/tiết theo hàng).
3. TKB lớp buổi chiều (bảng có hàng tiêu đề `Lớp`; tên tệp hoặc tiêu đề phải có chữ `Chiều`).

Bộ nhập có 3 bộ đọc riêng. Các tệp nguồn được giữ nguyên; dữ liệu chuyển thành bản ghi gồm tuần, buổi, loại bản ghi, giáo viên, lớp, môn, thứ, tiết và nguồn. Bảng lớp buổi chiều được dùng để suy ra TKB giáo viên chiều khi tên giáo viên xuất hiện trong danh sách giáo viên của tệp TKB giáo viên sáng. Những ô không suy ra chắc chắn vẫn giữ nội dung gốc và được báo cáo là chưa xác định; cần rà soát trước khi công bố.

Hệ thống yêu cầu đủ 3 loại tệp trước khi cập nhật để tránh xuất bản thiếu một phần. Khi hộp xác nhận xuất hiện, OK thay thế dữ liệu tuần đang chọn; Cancel gộp dữ liệu. Nên chọn OK khi cập nhật đầy đủ cả 3 tệp cùng tuần.

## 2. Giao diện tra cứu
- TKB giáo viên: chọn buổi sáng/chiều, chọn giáo viên.
- TKB lớp: chọn buổi sáng/chiều, chọn lớp.
- Mỗi màn hình có nút chuyển chế độ bảng hiện đại / bảng dạng Excel.

## 3. Đồng bộ Google Sheets
1. Tạo một Google Spreadsheet mới cho Smart Timetable V2.3. Nếu đã dùng bản V2.3 trước đó với cấu trúc cột cũ, hãy tạo Spreadsheet mới để tránh lệch schema.
2. Mở Extensions → Apps Script, dán toàn bộ `google-apps-script/Code.gs`.
3. Trong `Code.gs`, thay `PASTE_GOOGLE_SHEET_ID_HERE` bằng ID của Spreadsheet. Đổi `ADMIN_TOKEN` thành một chuỗi bí mật dài.
4. Trong `js/cloud-config.js`, đặt `CLOUD_API_URL` bằng URL Web App kết thúc `/exec` và đặt `ADMIN_TOKEN` cùng giá trị.
5. Deploy → New deployment → Web app. Execute as: Me. Chọn quyền truy cập phù hợp với chính sách nhà trường; nếu chọn truy cập Anyone, không lưu dữ liệu nhạy cảm trong bảng này.
6. Sau khi thay mã hoặc cấu hình, tạo phiên bản deployment mới và cập nhật URL nếu thay đổi.
7. Đưa thư mục `smart-timetable-v2-fixed` lên GitHub Pages. Dùng HTTPS để có đủ tính năng.

Google Sheets lưu các bản ghi chuẩn hóa theo hàng, có cột tuần/buổi/loại TKB. Dữ liệu của đúng tuần được thay thế khi xuất bản, các tuần khác được giữ nguyên.

## 4. Kiểm soát dữ liệu và bảo mật
- Kiểm tra báo cáo số bản ghi của ba tệp và các ô TKB chiều không xác định được giáo viên trước khi xuất bản.
- Dữ liệu cục bộ trên trình duyệt không thay thế dữ liệu máy chủ. Chỉ dữ liệu đã công bố mới được các máy khác tải.
- Token đặt trong JavaScript phía trình duyệt không phải cơ chế bảo mật mạnh vì người dùng có thể xem mã nguồn. Với môi trường chính thức, nên dùng Google Workspace có kiểm soát quyền hoặc một backend có xác thực người dùng.
- Cần kiểm thử thực tế Web App sau khi cấu hình Spreadsheet và URL; gói này chưa thể xác minh đồng bộ trên tài khoản Google của nhà trường.
