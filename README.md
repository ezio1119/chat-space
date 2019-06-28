# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

# DB設計

## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

  ### Association
  - belongs_to :group
  - belongs_to :user



## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|integer|null: false|


  ### Association
  - has_many :users, through: :members
  - has_many :messages


## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string||
|e-mail|text|null: false, unique: true|
|password|text|null: false|

  ### Association
  - has_many :groups, through: :members
  - has_many :messages



## messageテーブル

|Column|Type|Options|
|------|----|-------|
|body|text||
|image|text||
|??|timestamp|null: false|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

  ### Association
  - belongs_to :user
  - belongs_to :group