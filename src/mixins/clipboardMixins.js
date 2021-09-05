import ClipboardJS from 'clipboard';

export default {
    methods: {
        clipboard(className) {
            let copyObj = new ClipboardJS(className);
            return new Promise((resolve,reject) => {
                copyObj.on('success',(e) => {
                    e.clearSelection();
                    resolve({
                        result: e,
                        message: '复制成功'
                    });
                });
                copyObj.on('error',e => {
                    reject({
                        result: e,
                        message: '复制失败'
                    })
                });
            });
        }
    }
}