Page({

    data: {
        status: false
    },

    change: function(e){
        if (status) {
            this.setData({
                status: false, 
            })
        }   else {
            this.setData({
                status: true,
            })
        }
    }
})