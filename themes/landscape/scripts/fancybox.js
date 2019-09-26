var rUrl = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[.\!\/\\w]*))?)/

/**
 * Fancybox tag
 *
 * Syntax:
 *   {% fancybox /path/to/image [/path/to/thumbnail] [title] %}
 */

hexo.extend.tag.register('fancybox', function(args) {
  var original = args.shift(),
    thumbnail = ''

  if (args.length && rUrl.test(args[0])) {
    thumbnail = args.shift()
  }

  var title = args.join(' ')

  return (
    '<a class="fancybox" href="' +
    original +
    '" title="' +
    title +
    '">' +
    '<img src="' +
    (thumbnail || original) +
    '" alt="' +
    title +
    '">'
  )
  '</a>' + (title ? '<span class="caption">' + title + '</span>' : '')
})

hexo.extend.tag.register(
  'image_link',
  function(args, content) {
    // markdown内で {% instagram xxx %} と記述されている部分からxxxの箇所を取得する。(xxxは引数argの要素0番目)
    var postId = args[0]

    // instagramの埋め込みHTML。現時点ではバージョン7を利用している
    var returnHTML =
      '<a  href="https://developer.apple.com/account/#/welcome"  style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none;"  target="_blank"  ><img    src="https://developer.apple.com/account/#/welcome"    width="128"    height="128"    alt="イラスト1"/></a>'

    // 生成したhtmlをタグの出力結果として返す
    return returnHTML
  },
  {
    async: true,
    ends: false
  }
)
