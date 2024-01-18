var users = [
    {
        id: 1,
        name: 'Kien Dam'
    },
    {
        id: 2,
        name: 'Son Dang'
    },
    {
        id: 3,
        name: 'Xuan Huy'
    }
    // ...
]

var comments = [
    {
        id: 1,
        user_id: 1,
        content: 'Anh Son chua ra video :('
    },
    {
        id: 2,
        user_id: 2,
        content: 'Vua ra xong em oi!'
    }
]

// 1. Take comments 
// 2. From comments, take user_id
// 3. From user_id, take  corresponding user

// Fake API

function getComments() {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve(comments);
        }, 1000)
    });
}

function getUsersByIds(userIds) {
    return new Promise(function (resolve, reject) {
        var result = users.filter(function (user) {
            return userIds.includes(user.id);
        });
        setTimeout(function () {
            resolve(result);
        }, 1000);
    });
}


getComments()
    .then(function (comments) {
        var userIds = comments.map(function (comments) {
            return comments.user_id;
        });

        return getUsersByIds(userIds)
            .then(function (users) {
                return {
                    users: users,
                    comments: comments
                }
            })

    })
    .then(function (data) {
        var commentBlock = document.getElementById('comment-block');

        var html = '';
        data.comments.forEach(function (comment) {
            var user = data.users.find(function (user) {
                return user.id === comment.user_id;
            })
            html += `<li>${user.name}: ${comment.content}</li>`;
        })
        commentBlock.innerHTML = html;
    })




