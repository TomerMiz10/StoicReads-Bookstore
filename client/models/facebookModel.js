
    // Set up the necessary parameters
    // don't forget to generate your access token every day,  https://developers.facebook.com/tools/explorer/1288162832138619/?method=POST&path=116821598103786%2Ffeed%3Fmessage%3DTest%20from%20APIgdfgfdgdf&version=v17.0
    const ajaxWrapper = new AjaxWrapper();
    async function handlePostToFacebook() {
        let accessToken =
            'EAAEb7aKGxG0BOZB6L30UzGIkCqiipa49nZBqE7FGaTMkQOaqTIcOUVTm9oBTS2giqpyXiW3qhI7EruhHA77VIbUZBexbin4qK6WR4AXluzqoqKC1Ep5A75cTrwqmEstb9cscMa9FOkQZCZB97OexMkuDaVhb0ELC524eZAoITqsYj4zAeQfwwW4gw1z8Xw5kgaMSD65knBePu6jg0ZCfZCdYeLwZD';
        const pageId = "110550248813774";
        const data = await ajaxWrapper.getAuthData();
        const user = data.user;
        const postMessage = user.userName+' has just purchased a product from our store!';
        var apiUrl = "https://graph.facebook.com/v17.0/" + pageId + "/feed";
        // Set up the post data
        var postData = {
            message: postMessage,
            access_token: accessToken,
        };

        // Send the post request
        $.ajax({
            url: apiUrl,
            type: "POST",
            data: postData,
            success: function (response) {
                alert("Post successfully sent!");
                window.location = 'index.html';
            },
            error: function (xhr, status, error) {
            },
        });

    }


