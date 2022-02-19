import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.user';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  Hello(): string {
    return '你成功访问到了service';
  }

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }


  // 获取所有用户数据列表
  async findAll(): Promise<User[]> {
    /* 
    第一种方式 拼接sql并执行sql进行查询
    这种方式自由，想要什么直接拼接然后执行即可获得数据，对sql比较熟悉的有优势
    虽然用的较少，但在一些复杂的查询或者自己对orm不熟悉的情况下使用也是不错的。
    let getsql = 'select * from user';
    let list = await this.userRepository.query(getsql);
    */

    // --------------------------------------------------------
    // 第二种方式直接调用Repository Api的相关方法
    // 这种方式简单快捷，通常用于各种常规增删查改操作，可以提高效率。
    // 问题则是需要掌握Repository Api各种内置的方法以及其参数的常规使用，用多了就熟悉了
    let list = await this.userRepository.find();
    return list;
  }

  /* 
    获取单个用户详情
  */
  async findOne(query: number): Promise<User> {
    // 第一种方式 拼接sql并执行sql进行查询
    // let getsql = 'select * from user where id =' + query.id;
    // let list = await this.userRepository.query(getsql);

    // 第二种方式直接调用Repository Api的相关方法
    let list = await this.userRepository.findOne({ id: query });
    return list
  }

  /* 
    新增用户
  */
  async addOne(user: User): Promise<String> {
    // 第一种方式 拼接sql并执行sql进行查询
    // 这种方式自由，想要什么直接拼接然后执行即可获得数据，对sql比较熟悉的有优势

    // let addsql = `INSERT INTO user(name,age,account,password)
    // values("${rUser.name}",${rUser.age},"${rUser.account}",${rUser.password})`;
    // let list = await this.userRepository.query(addsql);

    // 第二种方式直接调用Repository Api的相关方法
    let list = await this.userRepository.insert(user)
    if (list) {
      // console.log(list)
      return '新增成功!';
    } else {
      return '新增失败!';
    }

    /* 第三种方式直接获取连接属性，并且构建QueryBuilder查询,这种方式无需使用@InjectRepository装饰器实例化相关对象，随时随地用
    这种方式可扩展可兼容，简单便捷，也是TypeORM 最强大的功能之一，可以使用优雅便捷的语法构建 SQL 查询
    但是需要更多的了解QueryBuilder查询构建的方式
    let list = await getConnection()
      .createQueryBuilder()
      .insert()
      .into(User)
      .values(rUser)
      .execute(); */
  }
  /* 
  修改用户
  */
  async updateOne(user: User): Promise<String> {
    /* 第一种方式 拼接sql并执行sql进行查询
    这种方式自由，想要什么直接拼接然后执行即可获得数据，对sql比较熟悉的有优势
    虽然用的较少，但在一些复杂的查询或者自己对orm不熟悉的情况下使用也是不错的。 */

    /* let upsql = `UPDATE user SET
    name = "${uUser.name}",age = "${uUser.age}",account = "${uUser.account}", password = "${uUser.password}"
    WHERE id = "${uUser.id}"`;
    let list = await this.userRepository.query(upsql); */

    /* 第二种方式直接调用Repository Api的相关方法
    这种方式简单快捷，通常用于各种常规增删查改操作，可以提高效率。
    问题则是需要掌握各种内置的方法以及其参数的常规使用，用多了就熟悉了 */
    let list = await this.userRepository.update({ id: user.id }, user);

    // 第三种方式直接获取连接属性，并且构建QueryBuilder查询

    /* let list = await getConnection()
      .createQueryBuilder()
      .update(User)
      .set(uUser)
      .where('id = :id', { id: uUser.id })
      .execute(); */

    if (list) {
      return '修改成功!';
    } else {
      return '修改失败!';
    }
  }

  /* 
  删除用户
  */
  async delOne(flag: number): Promise<String> {
    // 第一种方式 拼接sql并执行sql进行查询
    // 这种方式自由，想要什么直接拼接然后执行即可获得数据，对sql比较熟悉的有优势
    // 虽然用的较少，但在一些复杂的查询或者自己对orm不熟悉的情况下使用也是不错的。

    // let dsql = `DELETE FROM user WHERE id = ${query.id}`;
    // let list = await this.userRepository.query(dsql);

    // 第二种方式直接调用Repository Api的相关方法
    let list = await this.userRepository.delete({ id: flag });

    /* 第三种方式直接获取连接属性，并且构建QueryBuilder查询
    let list = await getConnection()
      .createQueryBuilder()
      .delete()
      .from(User)
      .where('id = :id', { id: query.id })
      .execute(); */

    if (list) {
      return '删除成功!';
    } else {
      return '删除失败!';
    }
  }
}
