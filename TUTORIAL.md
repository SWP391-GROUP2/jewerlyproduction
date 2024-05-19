# GIT

## Quy trình:
![Screenshot 2024-05-19 090257](https://github.com/MinhCurus/SWP391-Group2/assets/99969599/393d2355-0854-43b8-b743-1e2475a75786)
## Các lệnh basic:
- git init: tạo local repo
- git status: xem trạng thái các file
- Thêm file:
  + Thêm đúng 1 file đó: git add <tên file>
  + Thêm hết: git add.
- git commit -m "msg": ghi chú đang làm cái gì (thay msg bằng chú thích)
- git remote add origin https://github.com/MinhCurus/SWP391-Group2.git : trỏ url cần push code (default)
- git push -u origin master: đẩy code vào nhánh master (nhánh thay đổi đc)
- git pull: lấy code về, đồng bộ với code cũ
- git log: xem lịch sử thao tác các file
- git branch <tên-branch>: tạo branch mới
- git checkout <tên-branch>: chuyển code qua branch mới
- git merge <ten-branch>: merge code về branch master (phải chuyển về branch master mới merge đc)
## Note: 
- Lấy code về máy: vào cmd gõ git clone https://github.com/MinhCurus/SWP391-Group2.git(default)
- Gặp lỗi conflict, cách xử lí là pull code về rồi mới push lên. (trường hợp muốn sửa file có sẵn)
- Luôn làm branch phụ, tạo pull request. OK rồi mới merge vào code chính.
