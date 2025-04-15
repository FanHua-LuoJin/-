let isAdmin = false;

let userNickName=localStorage.getItem('rememberNickName')||'';
document.getElementById('nickName').value=userNickName


let comments = JSON.parse(localStorage.getItem("comments")) || [];
comments =comments.map(comment =>{
    if(!comment.id){
        comment.id=Date.now().toString(36) + Math.random().toString(36).substring(2);
    }
    return comment;
})


document.getElementById('commentInput').addEventListener('input',function(e){
    const maxLength =200;
    let current = e.target.value.length;
    document.getElementById('charCount').textContent=current+'/'+maxLength;

    if(current > maxLength){
        e.target.value=e.target.value.substring(0,maxLength);
    }
})

function submitComment(){
    const nickNameInput = document.getElementById('nickName')
    const input=document.getElementById('commentInput');
    const content=input.value.trim();

    let nickname=nickNameInput.value.trim();
    if (nickname.length >20){
        nickname=nickname.substring(0,20)+'...'
    }

    if(!content){
        alert('留言内容不能为空');
        return;
    }
    const remember=document.getElementById('rememberNickName').checked;
    if(remember && nickname){
        localStorage.setItem('rememberNickName',nickname)
    }else{
        localStorage.removeItem('rememberNickName')
    }


    const newComment = {
        id:Date.now().toString(36)+Math.random().toString(36).substring(2),
        content: content.replace(/&/g, '&amp;')
                       .replace(/</g, '&lt;')
                       .replace(/>/g, '&gt;')
                       .replace(/"/g, '&quot;')
                       .replace(/'/g, '&#39;'),
        date:new Date().toLocaleString('zh-CN'),
        likes:0,
        nickname:nickname||'匿名用户',
    };

    comments.unshift(newComment);
    localStorage.setItem('comments',JSON.stringify(comments));
    input.value="";
    document.getElementById('charCount').textContent = '0/200'
    renderComments();
}

function renderComments(){
    const container = document.getElementById('commentList');
    container.innerHTML=comments.map(comment => {
        const isLiked = !!localStorage.getItem(`liked_${comment.id}`);
        return`

        <div class='comment-item'>
            <div class="comment-header">
                <span>${comment.nickname || '匿名用户'}</span>
                <div>
                    <span>${comment.date}</span>
                    ${isAdmin ? `<button class="delete-btn" onclick="deleteComment('${comment.id.replace(/'/g, "\\'")||''}')">×</button>` : ''}
                </div>
            </div>
            <div class='comment-content'>${comment.content}</div>
                    <div class="like-btn" onclick="toggleLike('${comment.id}')">
                        <span class="like-icon">👍</span>
                        <span class="like-count">点赞数：${comment.likes || 0}</span>
            </div>
        </div>
    `}).join("");
}

function toggleLike(commentId){
    const comment=comments.find(c =>c.id ===commentId);
    if(!comment) return;

    const storageKey= `liked_${commentId}`;

    if(!localStorage.getItem(storageKey)){
        comment.likes = (comment.likes || 0)+ 1;
        localStorage.setItem(storageKey,'true');
    }else{
        comment.likes = Math.max((comment.likes || 0)- 1 ,0);
        localStorage.removeItem(storageKey)
    }
    
    const likeSection = document.querySelector(`[onclick="toggleLike('${commentId}')"]`);
    if (likeSection) {
        likeSection.classList.toggle('active', !localStorage.getItem(storageKey));
        likeSection.querySelector('.like-count').textContent = comment.likes;
    }


    localStorage.setItem('comments',JSON.stringify(comments));
    renderComments();
}
window.addEventListener('DOMContentLoaded',renderComments);



function enableAdminMode(){
    const situation = document.getElementById("adminSituation")
    if(isAdmin){
        isAdmin=false;
        document.querySelector('.admin-tools button').textContent='管理员模式';
        situation.textContent = ""; 
        renderComments();
        return;
    }

    const password = prompt('请输入管理员密码：');
    if (password === 'g9078563412'){
        isAdmin = true;
        alert('已进入管理员模式');
        situation.innerHTML="管理员模式";   
        document.querySelector('.admin-tools button').textContent='退出管理'; 
        renderComments()
    }else{
        alert("密码错误，请重试")
    }

 }

 function deleteComment(commentId){
    if(!isAdmin){
        alert('请先进入管理员模式！');
        return
    }

    if(confirm('确定要删除这条留言吗？')){
        comments=comments.filter(comment => comment.id !== commentId)
        localStorage.setItem('comments',JSON.stringify(comments));
        renderComments();
    }
 }

