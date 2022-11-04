export namespace IVkApi {
  export namespace Wall {
    export interface Response {
      count: number,
      items: Item[],
    }

    export interface Item {
      id: number,
      from_id: number,
      owner_id: number,
      date: number,
      marked_as_ads: number,
      can_delete: number,
      is_favorite: boolean,
      post_type: PostType,
      text: string,
      can_edit?: number,
      created_by?: number,
      can_pin: number,
      is_pinned?: number,
      attachments: Attachment[],
      post_source: PostSource,
      comments: Comments,
      likes: Likes,
      reposts: Reposts,
      views: Views,
      donut: Donut,
      short_text_rate: number,
      carousel_offset?: number,
      hash: string,
      edited?: number,
      postponed_id?: number,
    }

    export interface Attachment {
      type: AttachmentType,
      market_album?: MarketAlbum,
      link?: Link,
      video?: Video,
      photo?: LinkPhoto,
      poll?: Poll,
    }

    export interface Link {
      url: string,
      title: Title,
      caption?: string,
      description: string,
      photo?: LinkPhoto,
      is_favorite: boolean,
      target?: string,
    }

    export interface LinkPhoto {
      album_id: number,
      date: number,
      id: number,
      owner_id: number,
      sizes: Size[],
      text: string,
      user_id: number,
      has_tags: boolean,
      access_key?: string,
      post_id?: number,
    }

    export interface Size {
      height: number,
      url: string,
      type?: SizeType,
      width: number,
      with_padding?: number,
    }

    export enum SizeType {
      M = 'm',
      O = 'o',
      P = 'p',
      Q = 'q',
      R = 'r',
      S = 's',
      W = 'w',
      X = 'x',
      Y = 'y',
      Z = 'z',
    }

    export enum Title {
      Empty = '',
      LevshaKaluga = 'Levsha Kaluga',
    }

    export interface MarketAlbum {
      id: number,
      owner_id: number,
      title: string,
      count: number,
      updated_time: number,
      is_main: boolean,
      is_hidden: boolean,
      photo: LinkPhoto,
    }

    export interface Poll {
      multiple: boolean,
      end_date: number,
      closed: boolean,
      is_board: boolean,
      can_edit: boolean,
      can_vote: boolean,
      can_report: boolean,
      can_share: boolean,
      created: number,
      id: number,
      owner_id: number,
      question: string,
      votes: number,
      disable_unvote: boolean,
      anonymous: boolean,
      answer_ids: number[],
      embed_hash: string,
      photo?: PollPhoto,
      answers: Answer[],
      author_id: number,
    }

    export interface Answer {
      id: number,
      rate: number,
      text: string,
      votes: number,
    }

    export interface PollPhoto {
      color: string,
      id: number,
      images: Size[],
    }

    export enum AttachmentType {
      Link = 'link',
      MarketAlbum = 'market_album',
      Photo = 'photo',
      Poll = 'poll',
      Video = 'video',
    }

    export interface Video {
      access_key?: string,
      can_comment: number,
      can_edit: number,
      can_like: number,
      can_repost: number,
      can_subscribe: number,
      can_add_to_faves: number,
      can_add: number,
      can_attach_link?: number,
      comments: number,
      date: number,
      description?: string,
      duration: number,
      image: Size[],
      first_frame?: Size[],
      width: number,
      height: number,
      id: number,
      owner_id: number,
      ov_id?: string,
      title: string,
      is_favorite: boolean,
      track_code: string,
      type: VideoType,
      views: number,
      live_status?: string,
      is_author?: boolean,
      repeat?: number,
      content_restricted?: number,
      content_restricted_message?: string,
    }

    export enum VideoType {
      ShortVideo = 'short_video',
      Video = 'video',
    }

    export interface Comments {
      can_post: number,
      can_close: number,
      count: number,
      groups_can_post: boolean,
    }

    export interface Donut {
      is_donut: boolean,
    }

    export interface Likes {
      can_like: number,
      count: number,
      user_likes: number,
      can_publish: number,
    }

    export interface PostSource {
      type: PostSourceType,
      platform?: string,
    }

    export enum PostSourceType {
      API = 'api',
      Vk = 'vk',
    }

    export enum PostType {
      Post = 'post',
    }

    export interface Reposts {
      count: number,
      wall_count: number,
      mail_count: number,
      user_reposted: number,
    }

    export interface Views {
      count: number,
    }
  }
}
