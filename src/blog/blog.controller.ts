import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseFilePipeBuilder,
  ForbiddenException,
  UseGuards,
  HttpException,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { BlogService } from './blog.service';
import { CreateBlogDto, FileUploadDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { uploadImage } from '../helpers/imageUpload';
import { CategoryService } from '../category/category.service';
import { JwtAuthGuard } from '../auth/strategy';
import { GetUser } from 'src/auth/decorator';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';

@ApiTags('Blog')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('blog')
export class BlogController {
  constructor(
    private readonly blogService: BlogService,
    private readonly categoryService: CategoryService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  async create(
    @Body() createBlogDto: CreateBlogDto,
    @UploadedFile() file: Express.Multer.File,
    @GetUser('userId') id: string,
  ) {
    try {
      const { title, description, categoryId } = createBlogDto;
      const category = await this.categoryService.findId(parseInt(categoryId));
      if (!category) {
        throw new ForbiddenException('Category not found');
      }
      const imageUpload = await uploadImage(file);
      const image = imageUpload.secure_url;
      const userId = id;
      const blog = await this.blogService.create({
        title,
        description,
        image,
        userId: parseInt(userId),
        categoryId: parseInt(categoryId),
      });
      return blog;
    } catch (error) {
      console.log(error);
      if (error.message) {
        throw new HttpException(error?.message, 500);
      }
      throw new HttpException('Server error', 500);
    }
  }

  @Get()
  findAll() {
    return this.blogService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const blog = await this.blogService.findOne(id);
    if (!blog) {
      throw new NotFoundException('Blog not found');
    }
    return blog;
  }

  @Patch(':id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile(new ParseFilePipeBuilder().build({ fileIsRequired: false }))
    file: Express.Multer.File,
    @Body() updateBlogDto: UpdateBlogDto,
  ) {
    try {
      let image;
      const { title, description } = updateBlogDto;
      const blog = await this.blogService.findOne(id);
      if (!blog) {
        throw new ForbiddenException('Blog not found');
      }
      if (file) {
        const imageUpload = await uploadImage(file);
        image = imageUpload.secure_url;
      }
      const updateBlog = await this.blogService.update(id, {
        title,
        description,
        image,
      });
      return updateBlog;
    } catch (error) {
      console.log(error);
      if (error.message) {
        throw new HttpException(error?.message, 500);
      }
      throw new HttpException('Server error', 500);
    }
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const deleteBlog = await this.blogService.remove(id);
    if (!deleteBlog) {
      throw new NotFoundException('Blog not found');
    }
    return deleteBlog;
  }
}
