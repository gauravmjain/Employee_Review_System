$('.emp_isAdmin span').click(async (e)=>{
    e.preventDefault();
    let id = $(e.target).parent().parent().attr('id');
    await $.ajax({
        url : "/users/change_status",
        type : "POST",
        data : {
            id : id
        },
        success: (data) =>{
            // console.log();
            if(data.data.user.isAdmin){
                $(`#${id} .emp_isAdmin span`).html("Admin");
            }else{
                $(`#${id} .emp_isAdmin span`).html("Not Admin")
            }
        },
        error : (err) =>{
            console.log("Error",err);
        }

    })
})



$(".delete span").click(async (e)=>{
    e.preventDefault();
    let id = $(e.target).parent().parent().attr('id');
    await $.ajax({
        url: "/users/delete",
        type : "GET",
        data : {
            id : id
        },
        success : (data)=>{
            console.log("Success");
            location.reload();
        },
        error : (err)=>{
            console.log("Error",err);
        }
    })
})

