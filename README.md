# Farooq Economics Academy website

Flask site for the academy's existing Render service.

## Run locally

```bash
pip install -r requirements.txt
python app.py
```

Render start command: `gunicorn app:app`.

## Add Farooq's portrait through GitHub

The site deliberately contains no portrait image until the owner uploads it. In the public GitHub repository, open the `static` folder, choose **Add file → Upload files**, and upload the selected portrait with the exact filename `farooq-hasan.jpg`. Commit the upload to `main`. Render should redeploy from that branch; once complete, the image appears in the hero and About sections. A square JPEG at about 600 × 600 px is suitable. Files committed to this public repository, including historical versions, can be downloaded by anyone.

The photo slot shows a designed placeholder until the file exists. Visitors can prepare and copy an enquiry draft locally in their browser; no form submission or automatic messaging occurs.
