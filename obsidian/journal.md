---
created: <% tp.file.creation_date() %>
modification date: <% tp.file.creation_date("dddd Do MMMM YYYY HH:mm:ss") %>
tags:
  - journal
---
# <% moment(tp.file.title,'YYYY-MM-DD').format("dddd MMMM DD, YYYY") %>

---
### 📅 Daily Questions

##### 🙌 What I'm excited about right now
- 

##### 🚀 New tasks to complete
- [ ] 

##### 👎 What I struggled with today
- 

##### 🐢 What I learned today
- 

--------
# 💭 Morning Paper



---
# 📝 Notes
- 

---
### Notes created today
```dataview
List FROM "" WHERE file.cday = date("<%tp.date.now('YYYY-MM-DD')%>") SORT file.ctime asc
```
### Notes last touched today
```dataview
List FROM "" WHERE file.mday = date("<%tp.date.now('YYYY-MM-DD')%>") SORT file.mtime asc
```
