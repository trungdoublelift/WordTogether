/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import { Controller, Get, Body, Post, Delete, Put,Query } from '@nestjs/common';
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
    let result = await this.documentService.createNewDocument(body.userId,body.docName)
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
  async Save(@Body() body) {
    let result = await this.documentService.saveDocument(body.userId, body.docId, body.content)
    if (result.success) {
      return {
        status: 200,
        message: "Lưu tài liệu"
      }
    } else {
      return {
        status: 400,
        message: "Lưu tài liệu thất bại"
      }
    }
  }
  @Post(['read'])
  async Read(@Body() body) {
    console.log(body);
    let result = await this.documentService.readDocumentReturnString(body.docId);
    if (result.success) {
      return result.content.toString();
    } else {
      return '';
    }

  }
  @Delete(['delete'])
  async Delete(@Query('docId') docId:string) {
    let result = await this.documentService.deleteDocument(docId)
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
  @Put(['updateStatus'])
  async UpdateDocStatus(@Body() body) {

    let result = await this.documentService.updateDocStatus(body.docId, body.status)
    if (result.success) {
      return {
        status: 200,
        message: "Cập nhật trạng thái tài liệu thành công"
      }
    }else{
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
