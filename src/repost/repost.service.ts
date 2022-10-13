import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommentDto } from 'src/dto/comment.dto';
import { PostDto } from 'src/dto/post.dto';
import { Comments, CommentDocument } from 'src/schemas/comment.schema';
import { Counter, CounterDocument } from 'src/schemas/counter.schema';
import { Posts, PostDocument } from 'src/schemas/posts.schema';
import { User, UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class RepostService {
	constructor(@InjectModel(Posts.name) private postModel: Model<PostDocument>,
		@InjectModel(User.name) private userModel: Model<UserDocument>,
		@InjectModel(Comments.name) private commentModel: Model<CommentDocument>,
		@InjectModel(Counter.name) private counterModel: Model<CounterDocument>) { }



	private async getSequenceNextValue(counterid: string) {
		const seqDoc = await this.counterModel.findOneAndUpdate({ counterid }, {
			$inc: { value: 1 }
		});

		return seqDoc.value;
	}

	private async getUserId(id: string) {
		const res = await this.userModel.findById(id);
		return res.userId;
	}

	private async likePost(id: number, like: boolean) {
		try {
			if (like) {
				const result = await this.postModel.findOneAndUpdate({ id }, {
					$inc: { likes: 1 }
				});
			}
		} catch (error) {
			return error.message;
		}
	}

	private async getPostTitle(id: number) {
		try {
			const res = await this.postModel.findOne({ postid: id });
			return res.title;
		} catch (error) {
			return error.message;
		}
	}
	async newPost(userid: string, postDto: PostDto) {
		try {
			const userId = await this.getUserId(userid);
			const postId = await this.getSequenceNextValue('postid');
			const result = await this.postModel.create({ postid: postId, userid: userId, title: postDto.title, description: postDto.description })
			return "Post has been added";
		} catch (error) {
			return error.message;
		}
	}
	async getPosts() {
		try {
			const result = await this.postModel.find();
			return result.map((element) => {
				return { postID: element.postid, AuthorID: element.userid, title: element.title, desc: element.description, likes: element.likes }
			});
		} catch (error) {
			return error.message;
		}
	}

	async newComment(commentDto: CommentDto) {
		try {
			const postTitle = await this.getPostTitle(commentDto.postid);
			if (!postTitle) {
				return "Wrong post id";
			}
			await this.likePost(commentDto.postid, commentDto.like);
			await this.commentModel.create({
				postid: commentDto.postid,
				title: postTitle, comment: commentDto.comment
			})
			return "Comment has been added";
		} catch (error) {
			return error.message;
		}
	}

	async getCommets() {
		try {
			const comments = await this.commentModel.find();
			let res = comments.map((element) => {
				return { id: element.postid, title: element.title, comment: element.comment }
			});
			return res;
		} catch (error) {
			return error.message;
		}
	}
}
