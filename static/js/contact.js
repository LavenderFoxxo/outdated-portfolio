const submit = document.getElementById("submit-button");
if (submit) {
    submit.addEventListener("click", () => {
        const name = $("#name").val();
        const email = $("#email").val();
        const message = $("#message").val();
      
        if (name == "" || email == "" || message == "") {
          Swal.fire({
            title: "Error!",
            text: "Please fill out all fields!",
            icon: "error",
            background: "#333333",
          });
          return;
        }
      
        var data = {
          name: `${name}`,
          email: `${email}`,
          message: `${message}`,
        };
      
        $.ajax({
          contentType: "application/json",
          data: JSON.stringify(data),
          type: "POST",
          url: "/contact",
        })
          .done(() => {
            Swal.fire({
              title: "Success!",
              text: "Your message was sent!",
              icon: "success",
              background: "#333333",
            });
      
            $("#name").val("");
            $("#email").val("");
            $("#message").val("");
          })
          .fail(() => {
            Swal.fire({
              title: "Error!",
              text: "We were unable to send your message. Try again later!",
              icon: "error",
              background: "#242933",
            });
          });
      });
}
