### In the Designer
Let’s say you want to update a blog post and push those changes straight to your site. Now when you go to save the post, you’ll see a dropdown option, which gives you the option to publish the post directly, in addition to the existing option to stage those updates for the next site wide publish.
![Stage content changes for the next site wide publish, or instantly publish changes for individual items.](https://cdn.prod.website-files.com/687e8d1b96312cc631cafec7/68c3879c9d8c1a41a7903e5d_64f9399ca7d13575ff21c18f_Screen%2520Shot%25202018-02-15%2520at%25201.32.02%2520PM.png)
‍ _Stage content changes for the next site wide publish, or instantly publish changes for individual items._
### In the Editor
Similarly, Collaborators can now push content changes for individual items with a new dropdown option that lets them publish one item at a time.
![New publishing options: Editor style.](https://cdn.prod.website-files.com/687e8d1b96312cc631cafec7/68c3879c9d8c1a41a7903e64_64f9399ca7d13575ff21c2cb_Screen%2520Shot%25202018-02-15%2520at%25201.44.02%2520PM.png)
‍ _New publishing options: Editor style._
### Via the API
We’ve also pushed updates that allow developers to publish individual CMS items with the CMS API. For more details, check out our [updated API documentation](http://developers.webflow.com/#create-new-live-collection-item).
### Publishing restrictions
In some cases, publishing individual items would break your site. In these instances, we prevent you from being able to push single item updates. These instances include:
- Your site hasn’t been published
- The structure of the Collection for that item (or a referenced item) has changed
- You have multiple domains published at different times
- The item’s references create circular dependencies (for example, a blog post has an author, the author has a client, and the client has a blog post)
In each of these situations, the fix is simple: publish your entire site (to all domains) to make sure everything’s in sync.
* * *