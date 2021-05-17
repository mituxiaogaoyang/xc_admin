<template>
    <div class='newsDetail'>
        <div class="xc_header">
            <div class="core12">
                <div class="logo_box">
                    <span class="logo"><img src="@/assets/newsDetail/logo.png" alt=""></span>
                    <span class="word">北斗综合应用解决方案提供商</span> 
                </div>
                <div class="navs">
                    <ul id="headerNavs">
                        <li>
                            <a href="">首页</a>
                        </li>
                        <li>
                            <a >北斗精准时空应用服务平台</a>
                            <div class="down2 down3">
                                <div class="top" ></div>
                                <div class="content">
                                    <ul>
                                        <li><a href="">橙魔方</a></li>
                                        <li><a href="">地灾监测</a></li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                        <li>
                            <a href="">空天地一体化卫星综合应用解决方案</a>
                            <div class="down">
                                <div class="top" ></div>
                                <div class="content">
                                    <dl>
                                        <dt>硬件产品</dt>
                                        <dd><a href="">北斗RD设备</a></dd>
                                        <dd><a href="">高精度设备</a></dd>
                                    </dl>
                                    <dl>
                                        <dt>解决方案</dt>
                                        <dd><a href="">应急管理</a></dd>
                                        <dd><a href="">智慧交通</a></dd>
                                        <dd><a href="">精准城市</a></dd>
                                        <dd><a href="">国土地灾</a></dd>
                                    </dl>
                                </div>
                                
                            </div>
                        </li>
                        <li>
                            <a href="">产学研</a>
                        </li>
                        <li>
                            <a href="">关于我们</a>
                            <div class="down2">
                                <div class="top" ></div>
                                <div class="content">
                                    <ul>
                                        <li><a href="">关于我们</a></li>
                                        <li><a href="">文档中心</a></li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                        <li>
                            <a href="">互动服务</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="xc_banner_others">
            <img src="@/assets/newsDetail/banner.png" alt="">
            <ul class="bot_lists">
                <li>
                    <div class="top_box">
                        <i class="icon icon_bot1"></i>
                        <span>直播公告</span>
                    </div>
                    <div class="detail">
                        实时开启互动直播通道，提供专业化知识分享内容；
                    </div>
                </li>
                <li>
                    <div class="top_box">
                        <i class="icon icon_bot2"></i>
                        <span>新橙快讯</span>
                    </div>
                    <div class="detail">
                        新橙北斗资讯全报道系列，前瞻行业最新动态；
                    </div>
                </li>
                <li>
                    <div class="top_box">
                        <i class="icon icon_bot3"></i>
                        <span>北斗资讯</span>
                    </div>
                    <div class="detail">
                        第一时间推送北斗重大新闻资讯，直击北斗最前方；
                    </div>
                </li>
            </ul>
        </div>
        <div class="news_content">
            <!-- <div class="news_nav">
                <div class="box_black">
                    <div class="name_cn">互动服务</div>
                    <div class="name_en">NEWS</div>
                </div>
                <div class="news_types">
                    <div class="list"><a href=""> 服务公告</a></div>
                    <div class="list"><a href=""> 北斗资讯</a></div>
                    <div class="list"><a href=""> 新橙快讯</a></div>
                </div>
            </div> -->
            <div class="news_core">
                <div class="news_site">您的当前位置: 新闻详情</div>
                <div class="news_detail">
                    <div class="title">{{title}}</div>
                    <div class="time">{{time}}</div>
                    <div class="detail" v-html="content"></div>
                </div>
            </div>
        </div>
        <div class="xc_footer">
            <div class="go_top" id="goTop"></div>
            <div class="core12_no">
                <div class="link_friend">
                    <span class="word">友情链接</span>
                    <a href="">四川凉山北斗科技有限公司</a>
                    <a href="">贵州星耀迅联有限公司</a>
                </div>
                <div class="footer_center">
                    <div class="follow_us">
                        <div class="word">关注我们</div>
                        <div class="code_pic"><img src="@/assets/newsDetail/wechat.png" alt="wechat erweima"></div>
                        <div class="contact">
                            <div class="phone">400-028-6733</div>
                            <div class="time">周一至周日 8:00 —18:00</div>
                            <div class="serve"><a href="" target=_blank>24小时在线客服</a></div>
                        </div>
                    </div>
                    <div class="links">
                        <div class="link_list">
                            <div class="cate">产品及解决方案</div>
                            <div class="column_box">
                                <div class="column">
                                    <a href="">北斗RD设备</a>
                                    <a href="">高精度设备</a>
                                    <a href="">精准城市</a>
                                    <a href="">国土地灾</a>
                                </div>
                                <div class="column">
                                    <a href="">应急管理</a>
                                    <a href="">智慧交通</a>
                                </div>
                            </div>
                            
                        </div>
                        <div class="link_list">
                            <div class="cate">产品及解决方案</div>
                            <a href="">橙魔方</a>
                            <a href="">北斗+智慧软件</a>
                        </div>
                        <div class="link_list">
                            <div class="cate">互动服务</div>
                            <a href="">直播公告</a>
                            <a href="">北斗资讯</a>
                            <a href="">新橙快讯</a>
                            <a href="#consultPre">售前咨询</a>
                        </div>
                        <div class="link_list">
                            <div class="cate">关于我们</div>
                            <a href="">大事件</a>
                            <a href="">企业文化</a>
                            <a href="">合作伙伴</a>
                            <a href="">橙征英才</a>
                        </div>
                    </div>
                </div>
                <div class="site_info">
                    <span>&copy;2019成都新橙北斗智联有限公司.版权所有</span>
                    <span>豫ICP备案号148****29号</span>
                    <span>地址：成都市高新区科园二路航利中心2栋2单元 </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {getNewsInfo} from '@/apis/home';
    export default {
        components: {

        },
        data () {
            return {
                title:'',
                time:'',
                content:''
            };
        },
        mounted () {
            this.getContent();
        },
        methods: {
            getContent(){
                const ids =  this.$route.params.id;
                if(ids === 'preview'){
                    this.title = localStorage.getItem('newsTitle');
                    this.content =localStorage.getItem('newsContent');
                }else{
                    getNewsInfo(ids).then(res =>{
                        this.time = res.publishTime;
                        this.author = res.author;
                        this.title = res.title;
                        this.content =res.content;
                    });
                }
                
            }
        },
    };
</script>

<style lang='less' scoped>
@headerHeight: 56px;
.core12{
    width:1200px;
    margin:0 auto;
    display: flex;
    justify-content:space-between;
    align-items: center;
}

.flex{
    display: flex;
    justify-content: space-between;
}
.core12_no{
    width:1200px;
    margin:0 auto;
}
.xc_header{
    height:@headerHeight;
    position: absolute;
    top:0;
    left:0;
    right:0;
    background-color: rgba(36, 39, 54, .8);
    z-index: 10;
    ul,li{
        list-style: none;
        margin:0;
        padding:0;
    }
    dd,dl,p{
        margin: 0
    }
    a{
        text-decoration: none;
    }
    .logo_box{
        width:400px;
        color:#fff;
        span{display: inline-block;vertical-align: middle;}
        .logo{
            height:40px;
            margin-top:7px;
            img{
                width:auto;
                height:100%;
            }
        }
        .word{
            padding-left: 3px;
        }
    }
    .navs{
        font-size: 14px;
        >ul{
            width:700px;
            display: flex;
            justify-content:space-between;
            >li{
                position: relative;
                height: @headerHeight;
                line-height: @headerHeight;
                >a{
                    color:#fff;
                    &::after{
                        position: absolute;
                        content: '';
                        width:0;
                        height:2px;
                        bottom:0;
                        left:50%;
                        margin-left:-40px;
                        background-color:#E8C979 ;
                        opacity: 0;
                        transition: all 0.2s;
                    }
                    &:hover{
                        color:#E8C979 ;
                        &::after{
                            opacity: 1;
                            width:80px;
                        }
                    }
                    &.on{
                        color:#E8C979 ;
                        &::after{
                            opacity: 1;
                            width:80px;
                        } 
                    }
                }
                .down{
                    display: none;
                    position: absolute;
                    line-height: 30px;
                    width:240px;
                    top:@headerHeight;
                    left: -66px;
                    padding-top:12px;
                    background-color: transparent;
                    .top{
                        position: absolute;
                        top:-6px;
                        left:110px;
                        border-style: solid;
                        border-width: 9px;
                        border-color: transparent transparent #fff transparent;
                        width: 0px;
                        height: 0px;
                    }
                    .content{
                        display: flex;
                        justify-content:space-between;
                        background-color: #fff;
                        box-shadow: 0 0 1px #fff;
                        padding:2px 20px 5px;
                        border-radius: 4px;
                    }
                    dl{
                        width:85px;
                        a{
                            color:rgba(0,0,0,.7);
                            transition: color 0.3s;
                            &:hover{
                                color:#E0B15E;
                            }
                        }
                        dt{
                            border-bottom: 1px solid #BFBFBF;
                            margin-bottom: 3px;
                            color:rgba(32, 35, 48, .7);
                            font-weight: bold;
                        }
                        dd{
                            line-height: 24px;
                            font-size: 12px;
                        }
                    }
                }
                .down2{
                    display: none;
                    position: absolute;
                    line-height: 30px;
                    top:@headerHeight;
                    left: -20px;
                    padding-top:12px;
                    background-color: transparent;
                    width:100px;
                    a{
                        color:rgba(0,0,0,.7);
                        transition: color 0.3s;
                        &:hover{
                            color:#E0B15E;
                        }
                    }
                    .top{
                        position: absolute;
                        top:-6px;
                        left:40px;
                        border-style: solid;
                        border-width: 9px;
                        border-color: transparent transparent #fff transparent;
                        width: 0px;
                        height: 0px;
                    }
                    .content{
                        display: flex;
                        justify-content:space-between;
                        background-color: #fff;
                        box-shadow: 0 0 1px #fff;
                        padding:2px 20px 5px;
                        border-radius: 4px;
                    }
                }
                .down3{
                    left: 40px;
                }
                &:hover{
                    .down{
                        display: block;
                    }
                    .down2{
                        display: block;
                    }
                }
            }
        }
        
    }
}
.xc_footer{
    background-color: #272B3B;
    position: relative;
    color:#fff;
    padding:5px 0;
    a{text-decoration: none;}
    .go_top{
        position: absolute;
        top:-30px;
        left:50%;
        margin-left:540px;
        width:60px;
        height:60px;
        background: url(../assets/newsDetail/top.png) no-repeat;
        background-size: contain;
        cursor: pointer;
    }
    a{
        color:#C3C7CD;
        font-size: 12px;
        display: inline-block;
        &:hover{
            color:#fff;
        }
    }
    .link_friend{
        margin:16px 0;
        height: 32px;
        line-height: 32px;
        .word{
            padding-left:30px;
            background:url(../assets/newsDetail/link.png) left center no-repeat;
            background-size: contain;
        }
        a{
            margin-left:24px;
        }
    }
    .footer_center{
        padding: 20px 0;
        border-top: 1px solid #525457;
        border-bottom: 1px solid #525457;
        display: flex;
        justify-content: space-between;
        .follow_us{
            width:400px;
            border-right:1px solid #525457;
            .code_pic{
                width:120px;
                margin-top:20px;
                float: left;
            }
            .contact{
                width:260px;
                text-align: center;
                margin-top:30px;
                float: left;
                font-size: 12px;
                .phone{
                    color:#E0B15F;
                    font-size: 22px;
                    font-weight: bold;
                }
                .time{
                    color:#C3C7CD;
                    margin:10px 0;
                }
                .serve{
                    color:#E0B15F;
                    display: inline-block;
                    padding:1px 12px 1px 27px;
                    border: 1px solid #E0B15F;
                    background: url(../assets/newsDetail/message.png) 8px center no-repeat;
                }
            }
            &::after{
                content:'';
                display: block;
                height:0;
                clear: left;
            }
        }
        .links{
            display: flex;
            justify-content: space-between;
            .link_list{
                margin:0 50px;
                a{display: block;margin:12px 0;}
                .column_box{
                    width:170px;
                    display: flex;
                    justify-content: space-between;
                }
            }
        }
    }
    .site_info{
        margin:15px 0 30px ;
        text-align: center;
        font-size: 12px;
        color:#C3C7CD;
        span{
            padding:0 15px;
        }
    }
}
.xc_banner_others{
    background-color:rgb(0,1,34) ;
    min-height:320px;
    position: relative;
    @heightUl: 160px;
    margin-bottom: @heightUl/2;
    img{
        width:100%;
    }
    .bot_lists{
        width:1200px;
        .flex;
        position: absolute;
        bottom: -@heightUl/2;
        height: @heightUl;
        left:50%;
        margin-left:-600px;
        li{
            width:31%;
            background-color: rgba(255, 255, 255, .3);
            border:1px solid rgba(153, 153, 153, .3);
            box-sizing: border-box;
            height: @heightUl;
            padding: 0 40px;
           .top_box{
               text-align: center;
               font-size: 16px ;
               color:#fff;
               padding-top:18px;
               .icon{
                   display: inline-block;
                   width:50px;
                   height: 50px;
                   background-position: center center;
                   background-repeat: no-repeat;
                //    background-size: contain;
                   margin-right:12px;
                   vertical-align: middle;
               }
               span{
                    vertical-align: middle;
               }
           }
           .detail{
               color: rgba(0,0,0,.3);
               margin-top:36px;
           }
        }
    }
}
.news_content{
    width:1200px;
    margin:145px auto 45px;
    a{
        text-decoration: none;
    }
    .news_nav{
        width:250px;
        text-align: center;
        .box_black{
            height:60px;
            position: relative;
            background-color: #424242;
            .name_cn{
                background-color: #E0B15F;
                height:40px;
                line-height: 40px;
                position: absolute;
                bottom:0;
                width:180px;
                left:50%;
                margin-left:-90px;
                font-size: 20px;
                color:#f6f6f6;

            }
            .name_en{
                background-color: rgba(224, 177, 95, .7);
                height:30px;
                line-height: 30px;
                position: absolute;
                bottom:-30px;
                width:180px;
                left:50%;
                margin-left:-90px;
                color:#fff;
            }
        }
        .news_types{
            margin-top:60px;
            line-height: 45px;
            font-size: 16px;
            color:#222;
            padding:0 20px;
            .list{
                border-bottom: 1px solid #f0f0f0;
                a{
                    color:#222;
                }
                &.on{
                    a{
                        color:#E0B15F;
                    }
                    
                }
            }
        }
    }
    .news_core{
        width:1000px;
        margin:0 auto;
        .news_site{
            padding:20px 12px 10px;
            border-bottom: 1px solid #F4F4F4;
            position: relative;
            a{
                display: inline-block;
                color:#333;
                &:hover{
                    color:#000;
                }
            }
            &::after{
                content: '';
                width:3px;
                background-color: #E0B15F;
                height:20px;
                position: absolute;
                bottom:10px;
                left:0;
            }
        }
        .news_detail{
            .title{
                font-size: 18px;
                font-weight: bold;
                color: #E0B15F;
                text-align: center;
                padding:10px 50px;
            }
            .time{
                color:#666;
                height:26px;
                line-height: 26px;
                margin:10px 0;
                padding-left: 30px;
                font-size: 16px;
                background: url(../assets/newsDetail/clock.png) left center no-repeat;
                background-size:21px 21px ;
            }
        }
    }

}
.icon_bot1{
    background-image: url(../assets/newsDetail/icon_banner1.png);
}
.icon_bot2{
    background-image: url(../assets/newsDetail/icon_banner2.png);
}
.icon_bot3{
    background-image: url(../assets/newsDetail/icon_banner3.png);
}
</style>