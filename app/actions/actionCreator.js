export function moveToNextPage(click){
    return{
        type: "Move_NextPage",
        click
    }
}

export function moveToPreviousPage(click){
    return{
        type: "Move_PreviousPage",
        click
    }
}