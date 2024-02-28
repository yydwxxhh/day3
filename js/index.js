// window.onload=function(){} 等待文件加载在执行其中的代码
$(function(){
    //创建音频播放器对象(包装为jquery对象)
    const player = $('<audio>')
    // 基地址
    const musicListAPI = 'http://home.softeem.xin:8088/music/listAll'
    // 歌曲列表
    let musics = []
    //初始化索引
    let currentIndex = 0

    // $(css选择器).on('事件名', 事件处理函数)
    $('.meau').on('click', function(){
        $('#music-list-dialog').fadeIn(1000); // fadeIn(time)封装了show方法,show方法封装了display: black;
    })

    $('#btn-close').on('click', function(){
        $('#music-list-dialog').fadeOut(1000); // fadeOut(time)封装了show方法,show方法封装了display: black;
    })

    // axios
    // $.请求方法(url, (data)=>{ data是返回的数据 })
    $.get(musicListAPI, function(data){
        musics = data
        $.each(musics, (i,e) => {
            $('#music-list ul').append(`
            <li data-index="${i}">${e.name}</li>
            `)
        })
    })

    $('#music-list').on('click', 'li', function(){
        currentIndex = $(this).data('index')
        let m = musics[currentIndex]
        //player.prop(name,value)
        player.prop('src', m.path)
        //trigger触发play函数
        player.trigger(`play`)
        startPlay()
    })

    function startPlay(){
        // 唱片旋转
        $('.cover').css({'animationPlayState':'running'})
        let m = musics[currentIndex]
        // 头部显示歌曲名称
        $('.music-name').text(m.name)
        // 播放按钮切换
        $('.play_pause span').addClass('icon-kaishi').removeClass('icon-zanting')
        // 列表中正在播放的歌曲高亮
        $(`#music-list ul li`).css({'background-color': 'rgba(0,0,0,.6)','color': '#ccc'})
        $(`#music-list ul li:nth-child(${currentIndex+1})`).css({'backgroundColor':'pink','color':'red'})
    }
})