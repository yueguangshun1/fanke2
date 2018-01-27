var pool =require('./pool')


class Product{
    constructor(){}
    getListData(params,callback){
        var {cate_id,pageNum,pageSize,keyword} = params;
        
        cate_id*=1;  //把字符串 =》数字
        pool.getConnection(function(err,connection){
            if(err) throw err;
            //部分字段查询
            var sqlStr = "select * from product"
            if(cate_id){
                //想要按照分类 id 查找
                var sqlStr =sqlStr+" where cate_id="+cate_id
            }else if(keyword){
                //模糊查询  商品名
                sqlStr+=` where p_name like '%${keyword}%'`
            }
            
            if(pageNum){
                pageSize = pageSize||10
                var startNum = pageSize * (pageNum-1)
                //0,5   5,5   10,5
                sqlStr+=` limit ${startNum},${pageSize}`
            }
            console.log(pageNum,sqlStr)
            
            connection.query(sqlStr,function(err,listData){
                //释放连接
                //
                connection.query("select count(*) as total from product",function(err,results){
                    console.log(results[0].total)
                     callback({
                        listData,
                        count:results[0].total
                     })
                    connection.release()
                })
               
            })
        })
    }
    getDetailData({pid},callback){
        pool.getConnection((err,connection)=>{
             if(err) throw err;
             connection.query(`select * from product where pid=${pid||1}`,function(err,results){
                 if(err) throw err;
                 callback(results[0])
                 //释放连接
                 connection.release()
             })
        })
    }
    add({p_name,cate_id,price,total_number,img_url,img_list,start_time,desc=""},callback){
         img_list = JSON.stringify(img_list)
         console.log(img_list)
         //注意：desc 为 mysql关键字， 使用是需要用 `desc` 和字符串模板冲突，所有修改字段名为detail_desc
         pool.getConnection((err,connection)=>{
             if(err) throw err;
             var sqlStr = `insert into product(p_name,cate_id,price,total_number,img_url,start_time,img_list,detail_desc) values('${p_name}',${
                 cate_id},'${price}','${total_number}','${img_url}','${start_time}','${img_list}','${desc}')`
             console.log(sqlStr)
             connection.query(sqlStr,function(err,results){
                 if(err) throw err;
                 callback(results[0])
                 //释放连接
                 connection.release()
             })
        })
    }
}

module.exports = Product