define(['avalon'], function() {
    var vm = avalon.define({
        $id: 'body',
        textmsg: '这是一个text内容',
        textmsg2: 'aaaaaaaaa',
        htmlmsg: '<p>这是一个带样式的的内容</p>',
        attr_title: '标题',
        attr_obj: { title: '普通 ', algin: 'left' },
        for_obj: [{ aa: 1 }, { aa: 2 }, { aa: 3 }, { aa: 4 }, { aa: 5 }, { aa: 6 }],
        img_obj: [
            { src: 'https://unsplash.it/50/50/?random=' + Math.random() },
            { src: 'https://unsplash.it/50/50/?random=' + Math.random() },
            { src: 'https://unsplash.it/50/50/?random=' + Math.random() }
        ],
        cssmsg: '',
        attrmsg: ''
    });
});