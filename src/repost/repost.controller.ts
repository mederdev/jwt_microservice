import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { CommentDto } from 'src/dto/comment.dto';
import { PostDto } from 'src/dto/post.dto';
import { RepostService } from './repost.service';

@Controller('repost')
export class RepostController {
	constructor(private repostService: RepostService) { }

	@Post('/post')
	async setPost(@Req() req: any, @Body() postDto: PostDto) {
		const result = await this.repostService.newPost(req.user.id, postDto);
		return result;
	}

	@Post('/post-comment')
	async setComment(@Body() commentDto: CommentDto) {
		const result = await this.repostService.newComment(commentDto);
		return result;
	}

	@Get('/show-comments')
	async getComments() {
		const result = await this.repostService.getCommets();
		return result;
	}

	@Get('/show-posts')
	async getPosts() {
		const result = await this.repostService.getPosts();
		return result;
	}
}
