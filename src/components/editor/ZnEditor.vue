<template>
    <div>
        <div ref="richtext"></div>
    </div>
</template>

<script>
    import  E from  'wangeditor'
    export default {
        name: "ZnEditor",
        model:{
           prop:'value',
           event:'change'
        },
        props:{
           menus:{
               type:Array,
               default:function(){
                   return  [
                       'head',
                       'bold',
                       'fontSize',
                       'fontName',
                       'italic',
                       'underline',
                       'strikeThrough',
                       'indent',
                       'lineHeight',
                       'foreColor',
                       'backColor',
                       'link',
                       'list',
                       'todo',
                       'justify',
                       'quote',
                       'emoticon',
                       'image',
                       'video',
                       'table',
                       'code',
                       'splitLine',
                       'undo',
                       'redo',
                   ]
               }
           },
           value:{
               type:String
           }
        },
        methods:{
            initRichText(){
                let richTextElem = this.$refs.richtext;
                let editor = new E(richTextElem);
                editor.config.menus = this.menus;
                editor.config.onchange = (newhtml)=>{
                    this.$emit('set-description',newhtml);
                }
                editor.create();
                this.value && editor.txt.html(this.value);

           },
        },
        mounted() {
            this.initRichText();
        }
    }
</script>

<style scoped>

</style>
