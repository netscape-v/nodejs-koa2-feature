import { Body, Controller, Delete, Get, Param, Post, Put, Redirect } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { User } from 'src/entity/user.user';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) { }
  
  @Get('/hello')
  /* 重定向到接口界面
  @Redirect('/api')
  已经不需要了, 在main中改善了
  */
  @ApiOperation({
    tags: ["欢迎界面"],
    summary: "HelloWorld",
  })
  getHello(): string {
    return this.userService.Hello()
  }
  /* 查询所有列表 */
  @Get('list')
  @ApiOperation({
    tags: ["查询全部"],
    // summary: "HelloWorld",
  })
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }
  /* 查询单个详情 */
  @Get(':id')
  @ApiOperation({
    tags: ["查询单个详情"],
    summary: "ID不能为空",
  })
  findOne(@Param('id') id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  // /* 新增数据 */
  @Post('add')
  @ApiOperation({
    tags: ["新增用户"],
    summary: "Id唯一 ",
  })
  addOne(@Body() user: User): Promise<String> {
    return this.userService.addOne(user);
  }
  // /* 修改数据 */
  @Put('update')
  @ApiOperation({
    tags: ["用户信息更新"],
    summary: "根据ID更新用户",
  })
  updateOne(@Body() user: User): Promise<String> {
    return this.userService.updateOne(user);
  }
  // /* 删除数据 */
  @Delete('del/:flag')
  @ApiOperation({
    tags: ["删除用户"],
    summary: "根据ID删除用户",
  })
  delOne(@Param('flag') flag: number): Promise<String> {
    console.log(flag)
    return this.userService.delOne(flag);
  }
}
