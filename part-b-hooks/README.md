# Sổ chi tiêu cá nhân - Phần B

Ứng dụng được viết lại bằng Function Component và React Hooks, giữ nguyên giao diện của Phần A.

## Hooks sử dụng

- `useState`: quản lý bộ lọc, ô tìm kiếm, form, theme và trạng thái dữ liệu.
- `useEffect`: tải dữ liệu MockAPI, cập nhật tiêu đề tab và dọn timer/debounce.
- `useFetch`: gom logic GET, POST, DELETE, trạng thái loading và lỗi của MockAPI.
- `useRef`: focus lại ô Nội dung sau khi thêm khoản chi thành công.
- `useContext`: chia sẻ chế độ sáng/tối mà không phải truyền props qua nhiều component.
- `useClock`: đóng gói timer đồng hồ và tự dừng khi component bị unmount.
- `useDebounce`: trì hoãn việc lọc theo từ khóa để tránh xử lý mỗi lần gõ phím.

So với Class Component, Hooks giúp logic timer, gọi API, focus DOM và trạng thái dùng chung được tách thành các hook nhỏ, tái sử dụng được. Vì vậy component không phải phụ thuộc vào nhiều lifecycle như `componentDidMount`, `componentDidUpdate` và `componentWillUnmount`.

Ngoài ra, ứng dụng có thống kê tổng tiền theo từng loại và hỗ trợ lọc kết hợp với tìm kiếm có debounce.
