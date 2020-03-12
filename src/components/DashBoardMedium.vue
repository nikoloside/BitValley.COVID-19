<template>
    <div id="DashBoardMedium">
        <div class="wrap-dashboard wrap-shadow flex-container-spacebetween flex-direction-column">
            <div class="DashBoardUpper flex-container-spacebetween">
                <div class="DashBoardTitle">
                    {{ BoardTitle }}
                </div>
                <div class="DashBoardNumberColor">
                    {{ DifferentPersons }}
                </div>
            </div>
            <div class="DashBoardDowner flex-container-spacebetween">
                <div class="DashBoardNumberBlack">
                    {{ TotalPersons }}
                </div>
                <div class="DashBoardIcon">

                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'DashBoardMedium',
  data() {
    return {
      BoardTitle: '日本昨日感染人数',
      TotalPersons: '99,999',
      DifferentPersons: '+ 99,999',
      bPlus: true,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss" scoped>
@import "@/commons/_variables.scss";

#DashBoardMedium {
    display: flex;
    background-color: $color-background;
    border-radius: 12px;

    .wrap-dashboard {
        width: 283px;
        height: 97px;
    }

    .DashBoardUpper {
        width: 230px;
        height: 21px;
        margin-top: 16px;
        margin-left: 24px;
        margin-right: 24px;

        .DashBoardTitle {
            font-family: Noto Sans CJK JP;
            font-style: normal;
            font-weight: bold;
            font-size: 14px;
            line-height: 21px;
            /* identical to box height */
            letter-spacing: 0.01em;
            color: $color-black;
        }
        .DashBoardNumberColor {
            font-family: Poppins;
            font-style: normal;
            font-weight: bold;
            font-size: 14px;
            line-height: 21px;
            color: $color-pink;
        }
    }
    .DashBoardDowner {
        width: 230px;
        height: 36px;
        margin-bottom: 16px;
        margin-left: 24px;
        margin-right: 24px;

        .DashBoardNumberBlack {
            font-family: Poppins;
            font-style: normal;
            font-weight: bold;
            font-size: 24px;
            line-height: 36px;
            /* identical to box height */
            display: flex;
            align-items: center;
            color: $color-black;
        }
        .DashBoardIcon {
            width: 58px;
            height: 36px;
            background-image: url('../assets/image/increase.svg');
            background-size: 120%;
            background-position: center;
        }
    }
}
</style>
