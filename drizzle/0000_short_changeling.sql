CREATE TABLE `authentication` (
	`id` blob PRIMARY KEY NOT NULL,
	`userId` blob NOT NULL,
	`password` text NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` blob PRIMARY KEY NOT NULL,
	`userId` blob NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` blob PRIMARY KEY NOT NULL,
	`username` text NOT NULL,
	`displayname` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_username_unique` ON `users` (`username`);