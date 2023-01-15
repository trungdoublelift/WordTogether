/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import { Controller, Get, Body, Post, Delete, Put } from '@nestjs/common';
import { DocumentService } from './document.service';

@Controller('document')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) { }

  @Get()
  getHello(): string {
    return this.documentService.getHello();
  }

  @Post(['create'])
  async Create(@Body() body) {
    let result = await this.documentService.createNewDocument(body.userId)
    if (result.success) {
      return {
        status: 200,
        message: "Tạo tài liệu thành công",
        docId: result.docId
      }
    } else {
      return {
        status: 400,
        message: "Tạo tài liệu thất bại"
      }
    }
  }
  @Post(['save'])
  async Save(@Body() body){
    let result = await this.documentService.saveDocument(body.userId, body.docId, body.content)

  }
  @Post(['read'])
  async Read(@Body() body){
    console.log(body);
    let result = await this.documentService.readDocumentReturnString(body.docId);
    console.log(result);

  }
  @Delete(['delete'])
  async Delete(@Body() body) {
    let result = await this.documentService.deleteDocument(body.userId, body.docId)
    if (result.success) {
      return {
        status: 200,
        message: "Xóa tài liệu thành công"
      }
    } else {
      return {
        status: 400,
        message: result.error
      }
    }
  }
  @Put(['update'])
  async Update(@Body() body) {
    let result = await this.documentService.updateRight(body.userId, body.docId, body.updateUserId, body.right)
    if (result.success) {
      return {
        status: 200,
        message: "Cập nhật quyền thành công"
      }
    } else {
      return {
        status: 400,
        message: result.error
      }
    }
  }


}
