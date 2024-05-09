# Jewelry Production Order System
 Phần mềm quản lý đặt gia công trang sức
 
 ## Problem
 Trong nhiều doanh nghiệp trang sức, quá trình xử lý đơn hàng từ khách hàng gia công trang sức theo yêu cầu thường được thực hiện một cách thủ công, thông qua nhiều kênh truyền thông như email, điện thoại hoặc giấy tờ vật lý. Phương pháp này dễ dẫn đến hiểu lầm giữa các bộ phận bán hàng, nhà thiết kế, nhân viên sản xuất và khách hàng. Thông tin quan trọng như sở thích thiết kế, chi tiết giá cả và trạng thái đơn hàng có thể bị mất hoặc hiểu lầm trong quá trình trao đổi thủ công, gây ra sự không hài lòng từ phía khách hàng và có nguy cơ mất doanh thu cho doanh nghiệp. Hơn nữa, việc thiếu hệ thống trung tâm để theo dõi đơn hàng và quản lý chi phí làm cho việc quản lý trở nên phức tạp đối với các nhà quản lý.
 
 ## Context
 
 ## Actor
### Customer:
- View company introduction.
- View design templates and shared blogs.
- Submit jewelry processing requests based on available templates or new design requests.
- Track the status of jewelry processing orders.
- Approve 3D design drafts.
- View and accept price quotes.
- Make payments or cancel orders.
### Sale Staff
- Receive and discuss requests with customers.
- Send quote approval requests.
- Monitor the process from request submission to customer acceptance of the quote.
- Update and manage payment and order cancellation policies.
### Design Staff
- Send 3D design drafts to customers.
- Receive feedback and approve design drafts from customers.
### Production Staff:
- Receive Orders: Production staff should receive finalized orders with approved designs.
- Manage Inventory: They should be able to check inventory levels for required materials and components.
- Schedule Production: Production staff should schedule production tasks based on order priorities and available resources.
- Update Order Status: They should update the status of orders as they progress through various production stages.
- Quality Control: Production staff should perform quality checks at different stages of production to ensure the final product meets standards.
### Manager:
- Approve quotes from salespersons.
- Manage and approve processes in the processing order.
### Amin:
- Manage customer and staff information.
- Update information on applicable gold and gemstone prices.
- Manage design templates and cost standards.
- Display reports and statistics on business activities and processing order processes.

 ## Functional Requirement
 Phần mềm quản lý việc đặt gia công trang sức của khách hàng cho công ty gia công trang sức
 - Trang chủ giới thiệu công ty, bộ sưu tập trang sức, mẫu thiết kế, blog chia sẽ, …
 - Khách hàng có thể đặt yêu cầu gia công đồ trang sức theo mẫu thiết kế công ty hoặc theo yêu cầu thiết kế của khách.
 - Quản lý quá trình đặt gia công trang sức của khách hàng.
                << Khách hàng gửi yêu cầu --> NV kinh doanh tiếp nhận và trao đổi với khách --> NV kinh doanh gửi yêu cầu phê duyệt báo giá --> Người quản lý phê duyệt --> NV kinh doanh gửi báo giá đã phê duyệt--> khách hàng chấp nhận báo giá và tạo đơn hàng gia công --> NV thiết kế gửi bản thiết kế 3D cho khách --> khách hàng phê duyệt bản thiết kế 3D --> NV gia công thực hiện gia công trang sức --> NV kinh doanh bàn giao trang sức đã gia công và giấy bảo hành cho khách hàng >>
 - Cập nhật chi phí của đơn hàng gia công theo định mức để báo giá và thực tế gia công để tính giá vốn báo giá và thực hiện
                << Giá vốn sản phẩm = [giá vàng thời điểm * trọng lượng sản phẩm] + tiền công + tiền đá >>
 - Khai báo chính sách thanh toán, hủy đơn hàng gia công trang sức.
 - khai báo giá vàng và giá đá áp dụng của công ty.
 - Khai báo mẫu thiết kế của công ty và định mức chi phí thực hiện kèm theo.
 - Dashboard thống kê.
 
