const dummy = () => {
    return 1;
};
const addReducer = (accumulator, currentValue) => accumulator + currentValue;

const totalLikes = (objList) => {
    return objList.map(obj => obj.likes).reduce(addReducer);
};

const compareReducer = (initValue, currentValue) => initValue.likes > currentValue.likes ? initValue : currentValue;

const mostLiked = (objList) => {
    return objList.reduce(compareReducer);
};

function unique(array, propertyName) {
    return array.filter((e, i) => array.findIndex(a => a[propertyName] === e[propertyName]) === i);
}
// NEEDS IMPROVEMENT
const getLikes = (objList) => {
    let uniqueItems = unique(objList, 'author');
    console.log(uniqueItems);
    const likesRemoved = uniqueItems.map(item => ({...item, likes: 0}));
    for(let i=0; likesRemoved.length > i; i++) {
        for(let b=0; objList.length > b; b++) {
            if(likesRemoved[i].author === objList[b].author) {
                likesRemoved[i].likes += objList[b].likes;
            }
        }
    }
    let mostLikedAuthor = likesRemoved.reduce(compareReducer);
    return {author: mostLikedAuthor.author, likes: mostLikedAuthor.likes};
};

const comparePostsReducer = (initValue, currentValue) => initValue.posts > currentValue.posts ? initValue : currentValue;
// HOW SHIT IS THAT
const mostBlogs = (objList) => {
    let uniqueItems = unique(objList, 'author');
    const likesRemoved = uniqueItems.map(item => ({...item, posts: 0}));
    for(let i=0; likesRemoved.length > i; i++) {
        for(let b=0; objList.length > b; b++) {
            if(likesRemoved[i].author === objList[b].author) {
                likesRemoved[i].posts++;
            }
        }
    }
    let mostLikedAuthor = likesRemoved.reduce(comparePostsReducer);
    return {author: mostLikedAuthor.author, posts: mostLikedAuthor.posts};
};

// const checkLength = (str, atLeast) => {
//     if (str && /^\d{atLeast,}$/.test(str.trim())) {
//         return true;
//     }
//     return false;
// };

module.exports = { dummy, totalLikes, mostLiked, getLikes, mostBlogs };