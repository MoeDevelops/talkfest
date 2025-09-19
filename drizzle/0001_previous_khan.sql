CREATE TABLE `chat_messages` (
	`id` blob PRIMARY KEY NOT NULL,
	`author` blob NOT NULL,
	`room` blob NOT NULL,
	`content` text NOT NULL,
	FOREIGN KEY (`author`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`room`) REFERENCES `chats`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `chats` (
	`id` blob PRIMARY KEY NOT NULL,
	`user1` blob NOT NULL,
	`user2` blob NOT NULL,
	FOREIGN KEY (`user1`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user2`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
ALTER TABLE `users` ADD `avatar` text NOT NULL;